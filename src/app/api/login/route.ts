import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Identifiant et mot de passe requis.",
        },
        { status: 400 }
      );
    }

    let body: { identifier?: unknown; password?: unknown };

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Requête de connexion invalide.",
        },
        { status: 400 }
      );
    }

    const identifier = String(body.identifier ?? "").trim();
    const password = String(body.password ?? "");

    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Identifiant et mot de passe requis.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { identifier },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Identifiant ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Identifiant ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
      },
    });

    const response = NextResponse.json({
      success: true,
      message: "Connexion réussie.",
    });

    response.cookies.set("srm_client_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("POST /api/login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

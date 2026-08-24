import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = String(body.identifier ?? "").trim();

    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          message: "Identifiant requis.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { identifier },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "Si ce compte existe, les instructions de récupération seront disponibles.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl =
      `/espace-client/reset-password?token=${encodeURIComponent(token)}`;

    return NextResponse.json({
      success: true,
      message: "Demande de récupération créée.",
      resetUrl,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

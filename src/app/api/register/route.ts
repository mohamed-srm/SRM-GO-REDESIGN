import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const identifier = String(body.identifier ?? "").trim();
    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const password = String(body.password ?? "");

    if (!identifier || !fullName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez remplir tous les champs obligatoires.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Le mot de passe doit contenir au moins 8 caractères.",
        },
        { status: 400 }
      );
    }

    const existingIdentifier = await prisma.user.findUnique({
      where: { identifier },
    });

    if (existingIdentifier) {
      return NextResponse.json(
        {
          success: false,
          message: "Cet identifiant existe déjà.",
        },
        { status: 409 }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Cette adresse e-mail est déjà utilisée.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        identifier,
        fullName,
        email,
        phone: phone || null,
        address: address || null,
        passwordHash,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès.",
    });
  } catch (error) {
    console.error("POST /api/register error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

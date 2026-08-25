import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Non authentifié.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Tous les champs sont requis.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Le nouveau mot de passe doit contenir au moins 8 caractères.",
        },
        { status: 400 }
      );
    }

    const validCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!validCurrentPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Mot de passe actuel incorrect.",
        },
        { status: 401 }
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mot de passe modifié avec succès.",
    });
  } catch (error) {
    console.error(
      "POST /api/profile/change-password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

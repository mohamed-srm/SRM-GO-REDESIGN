import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

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
      where: {
        identifier,
      },
    });

    // Do not reveal whether the account exists.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "Si un compte correspond à cet identifiant, un email de réinitialisation sera envoyé.",
      });
    }

    if (!user.email) {
      return NextResponse.json({
        success: true,
        message:
          "Si un compte correspond à cet identifiant, un email de réinitialisation sera envoyé.",
      });
    }

    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const resetUrl =
      `${baseUrl}/espace-client/reset-password?token=${encodeURIComponent(token)}`;

    await sendPasswordResetEmail(user.email, resetUrl);

    return NextResponse.json({
      success: true,
      message:
        "Si un compte correspond à cet identifiant, un email de réinitialisation sera envoyé.",
    });
  } catch (error) {
    console.error("POST /api/forgot-password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

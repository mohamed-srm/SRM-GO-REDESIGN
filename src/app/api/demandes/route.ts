import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("srm_client_session")?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    select: {
      userId: true,
      expiresAt: true,
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    return null;
  }

  return session.userId;
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Non authentifié.",
        },
        { status: 401 }
      );
    }

    const demandes = await prisma.demande.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        files: true,
      },
    });

    return NextResponse.json({
      success: true,
      demandes,
    });
  } catch (error) {
    console.error("GET /api/demandes error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Non authentifié.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Titre et description requis.",
        },
        { status: 400 }
      );
    }

    const reference =
      `DEM-${Date.now()}-${crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase()}`;

    const demande = await prisma.demande.create({
      data: {
        userId,
        title,
        description,
        status: "En attente",
        reference,
      },
    });

    // Email de confirmation : l'absence d'email ou une erreur SMTP
    // ne doit pas empêcher la création de la demande.
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          fullName: true,
        },
      });

      if (user?.email && process.env.SMTP_FROM) {
        const baseUrl =
          process.env.NEXT_PUBLIC_APP_URL ||
          "http://localhost:3000";

        await sendPasswordResetEmail(
          user.email,
          `${baseUrl}/espace-client/demandes`
        );
      }
    } catch (emailError) {
      console.error(
        "Confirmation email error:",
        emailError
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demande créée avec succès.",
        demande,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/demandes error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

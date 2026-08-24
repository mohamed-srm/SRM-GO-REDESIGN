import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function getUserId(sessionValue: string | undefined) {
  const userId = Number(sessionValue);

  if (!Number.isInteger(userId) || userId <= 0) {
    return null;
  }

  return userId;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("srm_client_session");

    const userId = getUserId(session?.value);

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
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
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
    const cookieStore = await cookies();
    const session = cookieStore.get("srm_client_session");

    const userId = getUserId(session?.value);

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

    const reference = `DEM-${Date.now()}-${crypto
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

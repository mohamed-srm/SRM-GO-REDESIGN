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

    const reclamations = await prisma.reclamation.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      reclamations,
    });
  } catch (error) {
    console.error("GET /api/reclamations error:", error);

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
          message: "Objet et description requis.",
        },
        { status: 400 }
      );
    }

    const reference =
      `REC-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    const reclamation = await prisma.reclamation.create({
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
        message: "Réclamation créée avec succès.",
        reclamation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/reclamations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

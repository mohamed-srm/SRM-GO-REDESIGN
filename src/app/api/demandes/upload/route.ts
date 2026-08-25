import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

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

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Non authentifié." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const demandeId = Number(formData.get("demandeId"));
    const file = formData.get("file");

    if (!Number.isInteger(demandeId) || demandeId <= 0) {
      return NextResponse.json(
        { success: false, message: "Demande invalide." },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Fichier requis." },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Le fichier doit faire au maximum 10 Mo.",
        },
        { status: 400 }
      );
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Formats autorisés : PDF, JPG et PNG.",
        },
        { status: 400 }
      );
    }

    const demande = await prisma.demande.findFirst({
      where: {
        id: demandeId,
        userId,
      },
    });

    if (!demande) {
      return NextResponse.json(
        {
          success: false,
          message: "Demande introuvable.",
        },
        { status: 404 }
      );
    }

    const extension =
      file.type === "application/pdf"
        ? ".pdf"
        : file.type === "image/png"
          ? ".png"
          : ".jpg";

    const safeName =
      `${Date.now()}-${crypto.randomBytes(10).toString("hex")}${extension}`;

    const pathname = `demandes/${demande.id}/${safeName}`;

    const blob = await put(pathname, file, {
      access: "private",
      contentType: file.type,
    });

    const savedFile = await prisma.demandeFile.create({
      data: {
        demandeId: demande.id,
        originalName: file.name,
        fileName: blob.pathname,
        mimeType: file.type,
        size: file.size,
        path: blob.pathname,
      },
    });

    return NextResponse.json({
      success: true,
      file: savedFile,
      message: "Fichier ajouté avec succès.",
    });
  } catch (error) {
    console.error("POST /api/demandes/upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'upload.",
      },
      { status: 500 }
    );
  }
}

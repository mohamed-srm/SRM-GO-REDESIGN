import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import { readFile } from "fs/promises";
import { prisma } from "@/lib/prisma";

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("srm_client_session")?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    select: { userId: true, expiresAt: true },
  });

  if (!session || session.expiresAt <= new Date()) return null;

  return session.userId;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Non authentifié." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const fileId = Number(id);

    if (!Number.isInteger(fileId)) {
      return NextResponse.json(
        { success: false, message: "Fichier invalide." },
        { status: 400 }
      );
    }

    const file = await prisma.demandeFile.findFirst({
      where: {
        id: fileId,
        demande: {
          userId,
        },
      },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Fichier introuvable." },
        { status: 404 }
      );
    }

    const absolutePath = path.join(process.cwd(), "uploads", "demandes", file.fileName);
    const buffer = await readFile(absolutePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(
          file.originalName
        )}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/demandes/files/[id] error:", error);

    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}


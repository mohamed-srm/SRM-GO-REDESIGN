import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("srm_client_session")?.value;

    if (token) {
      await prisma.session.deleteMany({
        where: {
          token,
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "Déconnexion réussie.",
    });

    response.cookies.set("srm_client_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("POST /api/logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}

// File: app/api/pemesanan/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// FUNGSI UNTUK MENGHAPUS PESANAN (DELETE)
// Hanya dapat diakses oleh admin
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "ID pesanan tidak valid" },
        { status: 400 }
      );
    }

    // Hapus data booking dari database
    await prisma.booking.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data pesanan" },
      { status: 500 }
    );
  }
}

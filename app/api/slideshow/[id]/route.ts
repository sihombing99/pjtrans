import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

// GET - Ambil detail slideshow
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const slideshow = await prisma.slideshow.findUnique({
      where: { id },
    });

    if (!slideshow) {
      return NextResponse.json(
        { message: "Slideshow tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(slideshow);
  } catch (error) {
    console.error("Error fetching slideshow:", error);
    return NextResponse.json(
      { message: "Error fetching slideshow" },
      { status: 500 }
    );
  }
}

// PUT - Toggle aktif/nonaktif
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const { isActive } = await request.json();

    const updated = await prisma.slideshow.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating slideshow:", error);
    return NextResponse.json(
      { message: "Error updating slideshow" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus slideshow dan file gambar
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const slideshow = await prisma.slideshow.findUnique({
      where: { id },
    });

    if (!slideshow) {
      return NextResponse.json(
        { message: "Slideshow tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus file gambar
    if (slideshow.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", slideshow.imageUrl);
      try {
        await unlink(imagePath);
      } catch (unlinkError) {
        console.error("Gagal menghapus file gambar:", unlinkError);
      }
    }

    // Hapus record dari database
    await prisma.slideshow.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Slideshow berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting slideshow:", error);
    return NextResponse.json(
      { message: "Error deleting slideshow" },
      { status: 500 }
    );
  }
}

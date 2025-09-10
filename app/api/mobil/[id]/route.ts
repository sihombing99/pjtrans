// File: app/api/mobil/[id]/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { unlink } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// FUNGSI GET (tidak berubah, tapi disertakan untuk kelengkapan)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id, 10);
        if (isNaN(id)) {
            return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
        }

        const car = await prisma.car.findUnique({
            where: { id },
            include: { services: true }
        });

        if (!car) {
            return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json({ message: "Error fetching car" }, { status: 500 });
    }
}


// FUNGSI UNTUK MENGEDIT DATA (PUT)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
        return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    // Menerima JSON dengan 'content' di level atas, bukan di dalam services
    const { name, price, category, content, services } = await request.json();

    if (!name || !price || !category||!content)   {
      return NextResponse.json(
        { message: "Nama, harga, dan kategori harus diisi" },
        { status: 400 }
      );
    }

    // Menggunakan Prisma Transaction untuk menjaga konsistensi data
    await prisma.$transaction(async (tx) => {
      // 1. Update data utama mobil, sekarang termasuk 'content'
      await tx.car.update({
        where: { id },
        data: { name, price, category, content }, // 'content' diupdate di sini
      });

      // 2. Hapus semua service lama
      await tx.service.deleteMany({
        where: { carId: id },
      });

      // 3. Buat ulang semua service (sekarang tanpa 'content')
      if (services && Array.isArray(services) && services.length > 0) {
        await tx.service.createMany({
          // Pastikan 'content' tidak ada di sini
          data: services.map((service: { type: string; price: string; description: string; }) => ({
            type: service.type,
            price: service.price,
            description: service.description,
            carId: id,
          })),
        });
      }
    });

    return NextResponse.json({ message: "Mobil dan layanan berhasil diupdate" });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { message: "Error updating car" },
      { status: 500 }
    );
  }
}


// FUNGSI DELETE (tidak berubah, tapi disertakan untuk kelengkapan)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
     if (isNaN(id)) {
        return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

     const carToDelete = await prisma.car.findUnique({ where: { id } });
     if (carToDelete && carToDelete.image) {
       const imagePath = path.join(process.cwd(), "public", carToDelete.image);
       try {
           await unlink(imagePath);
       } catch (unlinkError) {
           console.error("Gagal menghapus file gambar:", unlinkError);
       }
     }

    await prisma.$transaction([
      prisma.service.deleteMany({
        where: { carId: id },
      }),
      prisma.car.delete({
        where: { id },
      }),
    ]);
    
    return NextResponse.json({ message: "Mobil dan layanannya berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { message: "Error deleting car" },
      { status: 500 }
    );
  }
}


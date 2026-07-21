// File: app/api/pemesanan/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 1. AMBIL SEMUA DATA PESANAN (GET)
// Hanya dapat diakses oleh admin/client yang berkepentingan
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc", // Tampilkan pesanan terbaru di bagian atas
      },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data pesanan" },
      { status: 500 }
    );
  }
}

// 2. TAMBAH PESANAN BARU (POST)
// Dipanggil oleh form order publik saat klik "Pesan Sekarang"
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nama,
      whatsapp,
      kapasitas,
      kendaraan,
      tanggalMulai,
      jamJemput,
      tanggalSelesai,
      jamSelesai,
      alamatJemput,
      tujuan,
      alamatPengantaran,
    } = body;

    // Validasi data input di sisi server
    if (
      !nama ||
      !whatsapp ||
      !kapasitas ||
      !kendaraan ||
      !tanggalMulai ||
      !jamJemput ||
      !tanggalSelesai ||
      !jamSelesai ||
      !alamatJemput ||
      !tujuan ||
      !alamatPengantaran
    ) {
      return NextResponse.json(
        { message: "Semua kolom formulir wajib diisi!" },
        { status: 400 }
      );
    }

    // Buat data pesanan baru di database
    const newBooking = await prisma.booking.create({
      data: {
        nama: nama.trim(),
        whatsapp: whatsapp.trim(),
        kapasitas: kapasitas,
        kendaraan: kendaraan,
        tanggalMulai: tanggalMulai,
        jamJemput: jamJemput,
        tanggalSelesai: tanggalSelesai,
        jamSelesai: jamSelesai,
        alamatJemput: alamatJemput.trim(),
        tujuan: tujuan.trim(),
        alamatPengantaran: alamatPengantaran.trim(),
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data pesanan ke database" },
      { status: 500 }
    );
  }
}

// File: app/admin/pemesanan/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Phone, Calendar, MapPin, Trash2, RefreshCw, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Definisikan Tipe Data Booking
type Booking = {
  id: number;
  nama: string;
  whatsapp: string;
  kapasitas: string;
  kendaraan: string;
  tanggalMulai: string;
  jamJemput: string;
  tanggalSelesai: string;
  jamSelesai: string;
  alamatJemput: string;
  tujuan: string;
  alamatPengantaran: string;
  createdAt: string;
};

export default function AdminPemesananPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mengambil daftar pesanan dari API
  const fetchBookings = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const response = await fetch("/api/pemesanan");
      if (!response.ok) throw new Error("Gagal mengambil data pesanan");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Terjadi kesalahan saat memuat data pesanan.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Menghapus pesanan berdasarkan ID
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pemesanan ini dari database?")) {
      try {
        const response = await fetch(`/api/pemesanan/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Gagal menghapus pesanan");
        
        // Perbarui list pesanan setelah sukses dihapus
        setBookings(bookings.filter((booking) => booking.id !== id));
        alert("Pesanan berhasil dihapus dari database.");
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Gagal menghapus pesanan. Silakan coba kembali.");
      }
    }
  };

  // Helper untuk format string tanggal createdAt database
  const formatCreatedAt = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB";
    } catch (e) {
      return dateStr;
    }
  };

  // Helper link WhatsApp eksternal
  const getWhatsAppLink = (num: string) => {
    let cleanNum = num.replace(/[^0-9]/g, "");
    if (cleanNum.startsWith("0")) {
      cleanNum = "62" + cleanNum.substring(1);
    }
    return `https://wa.me/${cleanNum}`;
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            Pesanan Masuk
          </h1>
          <p className="text-gray-500 mt-1">
            Daftar formulir pemesanan sewa mobil pelanggan yang masuk via website.
          </p>
        </div>
        
        <Button
          onClick={() => fetchBookings(true)}
          disabled={isRefreshing || isLoading}
          variant="outline"
          className="flex items-center gap-2 self-start sm:self-auto bg-white border-gray-300 hover:bg-gray-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Menyegarkan..." : "Segarkan Data"}
        </Button>
      </div>

      {/* Tampilan Loading */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500 font-medium animate-pulse">Memuat data pesanan...</p>
        </div>
      ) : bookings.length === 0 ? (
        // Tampilan Jika Pesanan Kosong
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
          <div className="p-4 bg-blue-50 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Belum Ada Pesanan</h3>
          <p className="text-gray-500 max-w-md">
            Saat ini tidak ada data pemesanan rental mobil yang tersimpan di dalam database.
          </p>
        </div>
      ) : (
        // Tabel Data Pesanan
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <th className="p-4 whitespace-nowrap">Waktu Masuk</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Mobil & Kapasitas</th>
                  <th className="p-4">Jadwal Rental</th>
                  <th className="p-4">Detail Alamat & Tujuan</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Waktu Masuk */}
                    <td className="p-4 align-top whitespace-nowrap text-xs font-semibold text-gray-500">
                      {formatCreatedAt(booking.createdAt)}
                    </td>

                    {/* Customer */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-gray-900">{booking.nama}</div>
                      <div className="mt-1.5 flex items-center">
                        <a
                          href={getWhatsAppLink(booking.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-md border border-green-200/50 transition-colors text-xs"
                        >
                          <Phone className="h-3.5 w-3.5 fill-current text-green-600" />
                          {booking.whatsapp}
                        </a>
                      </div>
                    </td>

                    {/* Mobil & Kapasitas */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-blue-800">{booking.kendaraan}</div>
                      <div className="mt-1 text-xs text-gray-600 flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded w-max">
                        👤 {booking.kapasitas}
                      </div>
                    </td>

                    {/* Jadwal Rental */}
                    <td className="p-4 align-top text-xs space-y-1.5 min-w-[160px]">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Calendar className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Mulai:</span>
                          <p className="font-medium">{booking.tanggalMulai} ({booking.jamJemput})</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Calendar className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Selesai:</span>
                          <p className="font-medium">{booking.tanggalSelesai} ({booking.jamSelesai})</p>
                        </div>
                      </div>
                    </td>

                    {/* Detail Alamat & Tujuan */}
                    <td className="p-4 align-top text-xs space-y-2 max-w-xs">
                      <div className="flex gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-700">Jemput:</span>
                          <p className="text-gray-600 mt-0.5 leading-relaxed">{booking.alamatJemput}</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-700">Tujuan:</span>
                          <p className="text-gray-600 mt-0.5 leading-relaxed font-semibold">{booking.tujuan}</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-700">Pengantaran:</span>
                          <p className="text-gray-600 mt-0.5 leading-relaxed">{booking.alamatPengantaran}</p>
                        </div>
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="p-4 align-top text-center">
                      <Button
                        onClick={() => handleDelete(booking.id)}
                        variant="destructive"
                        size="sm"
                        className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200/50 transition-colors p-2 shadow-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

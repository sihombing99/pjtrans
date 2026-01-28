"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type SlideshowImage = {
  id: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
};

export default function SlideshowAdminPage() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch slideshow images
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/slideshow?all=true");
      const data = await response.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Gagal mengambil data slideshow");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/slideshow", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal upload gambar");

      alert("Gambar berhasil diupload!");
      setImageFile(null);
      setImagePreview(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading:", error);
      alert((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/slideshow/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error("Gagal mengubah status");

      alert(
        !currentStatus ? "Gambar diaktifkan" : "Gambar dinonaktifkan"
      );
      fetchImages();
    } catch (error) {
      console.error("Error toggling:", error);
      alert((error as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;

    try {
      const response = await fetch(`/api/slideshow/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Gagal menghapus gambar");

      alert("Gambar berhasil dihapus!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting:", error);
      alert((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Kembali ke Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Slideshow</h1>
          <p className="text-gray-600 mt-2">
            Upload dan kelola gambar untuk slideshow homepage
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Upload Gambar Baru</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <div className="relative h-48 w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            <label className="block cursor-pointer">
              <span className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                Pilih Gambar
              </span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={isUploading || !imageFile}
              className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Gambar"}
            </button>
          </form>
        </div>

        {/* Images List Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Daftar Gambar</h2>

          {isLoading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-600">Belum ada gambar upload</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={image.imageUrl}
                      alt="Slideshow"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white ${
                        image.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {image.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-4">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleToggleActive(image.id, image.isActive)
                        }
                        className={`flex-1 py-2 px-3 rounded font-semibold text-sm transition flex items-center justify-center gap-1 ${
                          image.isActive
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                      >
                        {image.isActive ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Nonaktifkan
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            Aktifkan
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(image.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-semibold text-sm transition flex items-center justify-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

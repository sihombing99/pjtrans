'use client';
import React, { useRef, useState, useEffect } from 'react';

type Car = {
  id: number;
  name: string;
  price: string;
  image?: string | null;
};

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const CLOUD_NAME = "cek_1";       // ganti sesuai akun Cloudinary
  const UPLOAD_PRESET = "cekUpload"; // ganti sesuai preset Cloudinary

  // Fetch list mobil
  const fetchCars = async () => {
    const res = await fetch("/api/mobil");
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileRef.current?.files?.[0]) {
      alert("Pilih file dulu!");
      return;
    }

    try {
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append("file", fileRef.current.files[0]);
      formData.append("upload_preset", UPLOAD_PRESET);

      // Upload ke Cloudinary
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      console.log("Upload status:", uploadRes.status);
      console.log("Upload response:", await uploadRes.text());

      if (!uploadRes.ok) throw new Error("Upload gagal");
      const data = await uploadRes.json();
      const imageUrl = data.secure_url;

      // Simpan ke DB via Prisma
      const res = await fetch("/api/mobil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image: imageUrl }),
      });

      if (!res.ok) throw new Error("POST gagal");

      // Reset form
      setName('');
      setPrice('');
      if (fileRef.current) fileRef.current.value = '';

      // Refresh list mobil
      fetchCars();
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Admin CMS - Mobil</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nama Mobil" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Harga" value={price} onChange={e => setPrice(e.target.value)} required />
        <input type="file" ref={fileRef} />
        <button type="submit">Tambah Mobil</button>
      </form>

      <h2>Daftar Mobil</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {cars.map(car => (
          <div key={car.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h3>{car.name}</h3>
            <p>Harga: {car.price}</p>
            {car.image && <img src={car.image} alt={car.name} style={{ width: 200 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

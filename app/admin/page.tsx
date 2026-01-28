// File: app/admin/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";

// Definisikan tipe data yang sesuai dengan skema database terbaru
type Service = {
  id?: number;
  type: string;
  price: string;
  description: string;
};

type Car = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  content: string;
  year?: number;
  seats?: number;
  transmission?: string;
  services?: Service[];
};

export default function AdminPage() {
  // State untuk form utama, termasuk 'content'
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State utama
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  
  // State untuk mengelola daftar service saat mode edit
  const [currentServices, setCurrentServices] = useState<Service[]>([]);

  // Fungsi untuk mengambil daftar mobil
  const fetchCars = async () => {
    try {
      const response = await fetch("/api/mobil");
      if (!response.ok) throw new Error("Gagal mengambil data mobil");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Fungsi untuk menghapus mobil
  const handleDelete = async (id: number) => {
     if (confirm("Yakin ingin menghapus mobil ini beserta semua layanannya?")) {
        try {
            const response = await fetch(`/api/mobil/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Gagal menghapus mobil');
            fetchCars();
            alert("Mobil berhasil dihapus.");
        } catch (error) {
            console.error(error);
            alert((error as Error).message);
        }
    }
  };

  // Fungsi untuk memulai mode edit
  const handleEdit = async (car: Car) => {
    setEditingCar(car);
    setName(car.name);
    setPrice(car.price);
    setCategory(car.category);
    setYear(car.year?.toString() || "");
    setSeats(car.seats?.toString() || "");
    setTransmission(car.transmission || "");
    setImageFile(null);
    setImagePreview(car.image || null);

    try {
        const response = await fetch(`/api/mobil/${car.id}`);
        if (!response.ok) throw new Error('Gagal memuat detail layanan');
        const fullCarData: Car = await response.json();
        setContent(fullCarData.content || '');
        setCurrentServices(fullCarData.services || []);
    } catch (error) {
        console.error("Gagal mengambil detail layanan:", error);
        setCurrentServices([]);
        setContent('');
    }
  };
  
  const handleServiceChange = (index: number, field: keyof Omit<Service, 'id'>, value: string) => {
    const updatedServices = [...currentServices];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setCurrentServices(updatedServices);
  };

  const addNewService = () => {
    setCurrentServices([...currentServices, { type: '', price: '', description: '' }]);
  };

  const removeService = (index: number) => {
    setCurrentServices(currentServices.filter((_, i) => i !== index));
  };

  // Fungsi untuk handle perubahan gambar
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (editingCar) {
      try {
        if (imageFile) {
          // Jika ada gambar baru, upload terlebih dahulu
          const formData = new FormData();
          formData.append("image", imageFile);
          const uploadResponse = await fetch(`/api/mobil/${editingCar.id}/upload`, {
            method: 'POST',
            body: formData,
          });
          if (!uploadResponse.ok) throw new Error('Gagal mengupload gambar');
        }

        const response = await fetch(`/api/mobil/${editingCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            price, 
            category, 
            content,
            year: year ? parseInt(year) : null,
            seats: seats ? parseInt(seats) : null,
            transmission,
            services: currentServices 
          }),
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Gagal mengupdate mobil');
        }
        alert("Mobil dan layanan berhasil diupdate!");
      } catch (error) {
         console.error("Error:", error);
         alert((error as Error).message);
      }
    } 
    else {
      // Logika tambah mobil baru dengan content dan services
      if (!imageFile) return alert("Harap pilih gambar.");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("year", year );
      formData.append("seats", seats );
      formData.append("transmission", transmission);
      formData.append("image", imageFile);
      formData.append("services", JSON.stringify(currentServices));
      
      try {
        const response = await fetch("/api/mobil", { method: "POST", body: formData });
        if (!response.ok) throw new Error("Gagal menambahkan data mobil");
        alert("Mobil berhasil ditambahkan!");
      } catch (error) {
        console.error("Error:", error);
        alert((error as Error).message);
      }
    }
    
    // Reset semua state ke kondisi awal
    setEditingCar(null);
    setName("");
    setPrice("");
    setCategory("");
    setContent("");
    setYear("");
    setSeats("");
    setTransmission("");
    setImageFile(null);
    setImagePreview(null);
    setCurrentServices([]);
    form.reset();
    fetchCars();
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-2xl font-bold mb-4">{editingCar ? 'Edit Mobil' : 'Tambah Mobil Baru'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nama Mobil" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded"/>
          <input type="text" placeholder="Harga Mulai Dari" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 border rounded"/>
          <input type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border rounded"/>
          
          {/* Tambahan: Tahun, Seats, Transmisi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="number" 
              placeholder="Tahun (contoh: 2019)" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              className="w-full p-2 border rounded"
            />
            <input 
              type="number" 
              placeholder="Jumlah Seat (contoh: 5)" 
              value={seats} 
              onChange={(e) => setSeats(e.target.value)} 
              className="w-full p-2 border rounded"
            />
            <select 
              value={transmission} 
              onChange={(e) => setTransmission(e.target.value)} 
              className="w-full p-2 border rounded"
            >
              <option value="">Pilih Transmisi</option>
              <option value="Manual">Manual</option>
              <option value="Matic">Matic</option>
              <option value="Auto">Auto</option>
            </select>
          </div>

          {/* Textarea untuk konten utama mobil */}
          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-bold mb-2">Konten / Deskripsi Mobil</h2>
            <textarea
              placeholder="Tulis konten atau keterangan panjang mobil di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded mt-2 h-40"
            />
          </div>

          {/* Bagian untuk mengelola gambar */}
          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-bold mb-2">Gambar Mobil</h2>
            {imagePreview && (
              <div className="mb-4">
                <img src={imagePreview} alt="Preview" className="h-32 w-48 object-cover rounded border"/>
              </div>
            )}
            <label className="block mb-2 cursor-pointer">
              <input 
                type="file" 
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
              <span className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
                {editingCar ? 'Ubah Gambar' : 'Pilih Gambar'}
              </span>
            </label>
            {!editingCar && !imageFile && (
              <p className="text-red-600 text-sm">* Gambar wajib diisi untuk mobil baru</p>
            )}
          </div>

          {/* Bagian untuk mengelola layanan harga */}
          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-bold mb-4">Kelola Rincian Harga Layanan</h2>
            {currentServices.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 p-2 border rounded-lg bg-gray-50 items-center">
                <input type="text" placeholder="Tipe Layanan" value={service.type} onChange={(e) => handleServiceChange(index, 'type', e.target.value)} required className="p-2 border rounded"/>
                <input type="text" placeholder="Harga" value={service.price} onChange={(e) => handleServiceChange(index, 'price', e.target.value)} required className="p-2 border rounded"/>
                <input type="text" placeholder="Keterangan Singkat" value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} required className="p-2 border rounded"/>
                <button type="button" onClick={() => removeService(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 h-full">Hapus</button>
              </div>
            ))}
            <button type="button" onClick={addNewService} className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              + Tambah Layanan Baru
            </button>
          </div>
          
          <div className="flex space-x-2 pt-4">
             <button type="submit" className="flex-grow bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700">
                {editingCar ? 'Update Mobil & Layanan' : 'Tambah Mobil'}
            </button>
            {editingCar && (
              <button type="button" onClick={() => {
                  setEditingCar(null);
                  setName('');
                  setPrice('');
                  setCategory('');
                  setContent('');
                  setYear('');
                  setSeats('');
                  setTransmission('');
                  setImageFile(null);
                  setImagePreview(null);
                  setCurrentServices([]);
              }} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Daftar Mobil</h2>
          <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="p-2 text-left">Gambar</th>
                          <th className="p-2 text-left">Nama</th>
                          <th className="p-2 text-left">Harga</th>
                          <th className="p-2 text-left">Kategori</th>
                          <th className="p-2 text-left">Tahun</th>
                          <th className="p-2 text-left">Seat</th>
                          <th className="p-2 text-left">Transmisi</th>
                          <th className="p-2 text-left">Aksi</th>
                      </tr>
                  </thead>
                  <tbody>
                      {cars.map(car => (
                          <tr key={car.id} className="border-b">
                              <td className="p-2"><img src={car.image || ''} alt={car.name} className="h-12 w-20 object-cover rounded"/></td>
                              <td className="p-2">{car.name}</td>
                              <td className="p-2">{car.price}</td>
                              <td className="p-2">{car.category}</td>
                              <td className="p-2">{car.year || '-'}</td>
                              <td className="p-2">{car.seats || '-'}</td>
                              <td className="p-2">{car.transmission || '-'}</td>
                              <td className="p-2 space-x-1">
                                  <button onClick={() => handleEdit(car)} className="bg-yellow-500 text-white p-1 rounded text-xs hover:bg-yellow-600">Edit</button>
                                  <button onClick={() => handleDelete(car.id)} className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600">Hapus</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}


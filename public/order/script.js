/**
 * ==========================================================================
 * SCRIPT FORM PEMESANAN RENTAL MOBIL DENGAN INTEGRASI WHATSAPP
 * PT PORTAMA JAYA TRANSPORTASI (PJTRANS)
 * ==========================================================================
 */

// 1. PENGATURAN UTAMA
// Ganti nomor WhatsApp admin di bawah ini (gunakan kode negara tanpa '+' atau spasi, contoh: '6281315393681')
const adminNumber = "6281315393681";

document.addEventListener("DOMContentLoaded", () => {
  
  // 2. TOGGLE NAVIGATION DRAWER (MOBILE MENU)
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
      
      // Animasi tombol hamburger jika drawer terbuka
      const isOpened = mobileDrawer.classList.contains("open");
      const line1 = document.getElementById("line1");
      const line2 = document.getElementById("line2");
      const line3 = document.getElementById("line3");
      
      if (isOpened) {
        line1.style.transform = "rotate(45deg) translate(5px, 5px)";
        line2.style.opacity = "0";
        line3.style.transform = "rotate(-45deg) translate(7px, -7px)";
      } else {
        line1.style.transform = "none";
        line2.style.opacity = "1";
        line3.style.transform = "none";
      }
    });
  }

  // 2.5. LOAD VEHICLES FROM DATABASE DYNAMICALLY
  const kendaraanSelect = document.getElementById("kendaraan");
  if (kendaraanSelect) {
    // Tampilkan status memuat terlebih dahulu
    kendaraanSelect.innerHTML = '<option value="" disabled selected>Memuat kendaraan...</option>';

    fetch("/api/mobil")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal memuat data mobil");
        }
        return response.json();
      })
      .then((cars) => {
        // Reset dropdown ke keadaan awal
        kendaraanSelect.innerHTML = '<option value="" disabled selected>Pilih Kendaraan...</option>';
        
        if (cars && cars.length > 0) {
          // Menghindari duplikasi nama mobil menggunakan Set
          const uniqueCarNames = new Set();
          cars.forEach((car) => {
            if (car.name) {
              uniqueCarNames.add(car.name.trim());
            }
          });

          // Masukkan daftar nama mobil unik ke dalam dropdown
          uniqueCarNames.forEach((carName) => {
            const option = document.createElement("option");
            option.value = carName;
            option.textContent = carName;
            kendaraanSelect.appendChild(option);
          });
        } else {
          // Fallback jika database mobil kosong
          loadFallbackCars(kendaraanSelect);
        }
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        // Fallback jika API bermasalah (misal: koneksi terputus)
        loadFallbackCars(kendaraanSelect);
      });
  }

  // Fungsi pembantu untuk memuat mobil bawaan (fallback) jika database kosong/gagal fetch
  function loadFallbackCars(selectElement) {
    selectElement.innerHTML = '<option value="" disabled selected>Pilih Kendaraan...</option>';
    const fallbacks = [
      "Toyota Avanza",
      "Toyota Innova",
      "Toyota Hiace",
      "Toyota Alphard",
      "Mitsubishi Xpander"
    ];
    fallbacks.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      selectElement.appendChild(option);
    });
  }

  // 3. FORM SUBMISSION & VALIDATION LOGIC
  const orderForm = document.getElementById("orderForm");
  const errorBanner = document.getElementById("errorBanner");
  const errorMessage = document.getElementById("errorMessage");

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      // Mencegah reload halaman secara default
      event.preventDefault();

      // Reset status validasi & pesan error sebelumnya
      let isFormValid = true;
      errorBanner.classList.remove("show");
      
      // Ambil seluruh input field yang akan divalidasi
      const fields = [
        { id: "nama", label: "Nama Lengkap" },
        { id: "whatsapp", label: "Nomor WhatsApp" },
        { id: "kapasitas", label: "Kapasitas" },
        { id: "kendaraan", label: "Kendaraan" },
        { id: "tanggalMulai", label: "Tanggal Mulai" },
        { id: "jamJemput", label: "Jam Jemput" },
        { id: "tanggalSelesai", label: "Tanggal Selesai" },
        { id: "jamSelesai", label: "Jam Selesai" },
        { id: "alamatJemput", label: "Alamat Penjemputan" },
        { id: "tujuan", label: "Tempat Tujuan" },
        { id: "alamatPengantaran", label: "Alamat Pengantaran" }
      ];

      // Lakukan validasi per field
      fields.forEach((field) => {
        const inputElement = document.getElementById(field.id);
        const errorElement = document.getElementById(`error-${field.id}`);
        
        if (inputElement) {
          // Bersihkan class invalid sebelumnya
          inputElement.classList.remove("invalid");
          if (errorElement) {
            errorElement.classList.remove("show");
          }

          // Cek apakah field kosong (atau belum dipilih untuk select)
          const value = inputElement.value.trim();
          if (!value) {
            isFormValid = false;
            inputElement.classList.add("invalid");
            if (errorElement) {
              errorElement.classList.add("show");
            }
          }
        }
      });

      // Validasi tambahan: Tanggal Selesai tidak boleh mendahului Tanggal Mulai
      const tglMulai = document.getElementById("tanggalMulai").value;
      const tglSelesai = document.getElementById("tanggalSelesai").value;
      
      if (tglMulai && tglSelesai) {
        if (new Date(tglSelesai) < new Date(tglMulai)) {
          isFormValid = false;
          
          const tglSelesaiInput = document.getElementById("tanggalSelesai");
          const errorTglSelesai = document.getElementById("error-tanggalSelesai");
          
          tglSelesaiInput.classList.add("invalid");
          if (errorTglSelesai) {
            errorTglSelesai.innerText = "Tanggal selesai tidak boleh sebelum tanggal mulai";
            errorTglSelesai.classList.add("show");
          }
        }
      }

      // Jika ada field yang tidak valid
      if (!isFormValid) {
        errorBanner.classList.add("show");
        // Scroll halaman ke atas formulir agar banner error terlihat
        errorBanner.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      // 4. MEMPROSES & MEMFORMAT DATA KE WHATSAPP DENGAN MENYIMPAN KE DATABASE
      
      // Ambil nilai dari masing-masing field
      const nama = document.getElementById("nama").value.trim();
      const whatsapp = document.getElementById("whatsapp").value.trim();
      const kapasitas = document.getElementById("kapasitas").value;
      const kendaraan = document.getElementById("kendaraan").value;
      const tanggalMulai = formatDate(document.getElementById("tanggalMulai").value);
      const jamJemput = document.getElementById("jamJemput").value;
      const tanggalSelesai = formatDate(document.getElementById("tanggalSelesai").value);
      const jamSelesai = document.getElementById("jamSelesai").value;
      const alamatJemput = document.getElementById("alamatJemput").value.trim();
      const tujuan = document.getElementById("tujuan").value.trim();
      const alamatPengantaran = document.getElementById("alamatPengantaran").value.trim();

      // Atur loading state pada tombol submit
      const btnSubmit = document.getElementById("btnSubmit");
      const originalBtnText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 16px; height: 16px; margin-right: 8px;" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style="opacity: 0.75;"></path>
        </svg>
        Memproses Pemesanan...
      `;

      // Payload data booking
      const bookingData = {
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
        alamatPengantaran
      };

      // Simpan data pemesanan ke database via API Route handler
      fetch("/api/pemesanan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menyimpan ke database");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Pesanan berhasil disimpan:", data);
      })
      .catch((error) => {
        console.error("Gagal mencatat pesanan ke database:", error);
      })
      .finally(() => {
        // Kembalikan tombol ke keadaan semula
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;

        // Buat format pesan WhatsApp
        const pesan = 
`*FORM PEMESANAN RENTAL MOBIL*

🚗 *INFORMASI CUSTOMER*
Nama: ${nama}
WhatsApp: ${whatsapp}

🚗 *DETAIL KENDARAAN*
Kapasitas: ${kapasitas}
Kendaraan: ${kendaraan}

📅 *JADWAL PERJALANAN*
Tanggal Mulai: ${tanggalMulai}
Jam Jemput: ${jamJemput}
Tanggal Selesai: ${tanggalSelesai}
Jam Selesai: ${jamSelesai}

📍 *LOKASI & TUJUAN*
Alamat Jemput:
${alamatJemput}

Tujuan:
${tujuan}

Alamat Pengantaran:
${alamatPengantaran}

Terima kasih.`;

        // Encode pesan
        const encodedPesan = encodeURIComponent(pesan);

        // Bentuk url WhatsApp Link
        const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedPesan}`;

        // Buka link WhatsApp di tab baru
        window.open(whatsappUrl, "_blank");
      });
    });
  }
});

/**
 * Mengubah format tanggal dari YYYY-MM-DD (format HTML5 input date)
 * menjadi DD/MM/YYYY agar lebih ramah dibaca di Indonesia.
 * 
 * @param {string} dateString - Tanggal dalam format YYYY-MM-DD
 * @returns {string} Tanggal dalam format DD/MM/YYYY
 */
function formatDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

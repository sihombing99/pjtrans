import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const vehicles = [
	{
		id: "alphard",
		name: "Toyota Alphard",
		image: "/image/mobil/Alphard.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 2.800.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 3.200.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 2.500.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 42.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Nikmati kemewahan dan kenyamanan perjalanan Anda di Jakarta dengan Toyota Alphard. Cocok untuk kebutuhan bisnis, pernikahan, atau perjalanan keluarga. Armada terbaru, driver profesional, dan layanan premium siap menemani Anda.",
	},
	{
		id: "avanza",
		name: "Toyota Avanza",
		image: "/image/mobil/avanza.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 700.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 500.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 7.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Sewa Innova Zenix Jakarta menjadi solusi transportasi terdepan yang kini hadir untuk memenuhi ekspektasi mobilitas Anda. Anugrah Transport menghadirkan armada Innova Zenix terbaru dengan teknologi hybrid canggih yang menawarkan perpaduan optimal antara performa tangguh dan efisiensi bahan bakar. Kendaraan ini dirancang khusus untuk menaklukkan dinamika jalanan ibukota dengan kenyamanan tingkat premium. Layanan Rental mobil Innova Zenix menghadirkan pengalaman berkendara berbeda yang belum pernah Anda rasakan sebelumnya. Interior berkonsep lounge modern dengan kursi captain seat berventilasi udara, dashboard digital panoramik, serta ruang kabin yang lapang menciptakan atmosfer mewah dalam setiap perjalanan. Nikmati sensasi berkendara istimewa bersama keluarga, rekan bisnis, atau dalam event khusus Anda dengan mobil yang menggabungkan elegansi dan keberlanjutan lingkungan dalam satu paket sempurna.",
	},
	{
		id: "ertiga",
		name: "Suzuki Ertiga",
		image: "/image/mobil/ertiga.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 550.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 700.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 500.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 7.500.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Suzuki Ertiga, MPV irit dan nyaman untuk keluarga.",
	},
	{
		id: "pajero",
		name: "Mitsubishi Pajero",
		image: "/image/mobil/Pajero Sport.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.300.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.500.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 1.300.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 20.500.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Mitsubishi Pajero, SUV tangguh untuk segala medan.",
	},
	{
		id: "fortuner",
		name: "Toyota Fortuner",
		image: "/image/mobil/fortuner.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.200.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.400.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 1.200.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 18.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Fortuner, SUV premium untuk perjalanan nyaman dan aman.",
	},
	{
		id: "hilux",
		name: "Toyota Hilux Double Cabin",
		image: "/image/mobil/Haice Comuter.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 900.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.100.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 800.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 12.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Hilux Double Cabin, pick up tangguh untuk kebutuhan bisnis.",
	},
	{
		id: "calya",
		name: "Toyota Calya",
		image: "/image/mobil/calya.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 600.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 800.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 400.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 6.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Calya, city car ekonomis dan praktis.",
	},
	{
		id: "xenia",
		name: "Daihatsu All New Xenia",
		image: "/image/mobil/ertiga.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 650.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 850.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 450.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 7.500.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Daihatsu Xenia, MPV favorit keluarga Indonesia.",
	},
	{
		id: "vios",
		name: "Toyota Vios",
		image: "/image/mobil/vios.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 800.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 600.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 9.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Vios, sedan stylish dan nyaman.",
	},
	{
		id: "bmw5",
		name: "BMW 5 Series",
		image: "/image/mobil/5 series.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 3.500.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 4.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 3.000.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 50.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "BMW 5 Series, luxury sedan untuk pengalaman premium.",
	},
	{
		id: "camry",
		name: "Toyota Camry",
		image: "/image/mobil/Camry.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.500.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.800.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 1.200.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 18.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Camry, sedan premium untuk kenyamanan maksimal.",
	},
	{
		id: "mercedes",
		name: "Mercedes C300",
		image: "/image/mobil/C300.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 3.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 3.500.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 2.500.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 40.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Mercedes C300, luxury sedan dengan performa tinggi.",
	},
	{
		id: "vellfire",
		name: "Toyota Vellfire",
		image: "/image/mobil/Vellfire.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 3.200.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 3.800.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 2.800.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 45.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Vellfire, MPV premium untuk perjalanan eksklusif.",
	},
	{
		id: "elf",
		name: "Isuzu ELF",
		image: "/image/mobil/elf.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.200.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 800.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 12.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Isuzu ELF, bus mini untuk perjalanan rombongan.",
	},
	{
		id: "hiace",
		name: "Toyota Hiace Commuter",
		image: "/image/mobil/Haice Comuter.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.100.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.300.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 900.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 14.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Toyota Hiace Commuter, bus mini nyaman untuk wisata dan bisnis.",
	},
	{
		id: "granmax",
		name: "Daihatsu Gran Max Mini Bus",
		image: "/image/mobil/grand max mini bus.png",
		harga: [
			{ tipe: "12 Jam + Driver", harga: "Rp 1.000.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Full Day + Driver", harga: "Rp 1.200.000", ket: "Exclude BBM, Tol, Parkir, Makan Driver" },
			{ tipe: "Lepas Kunci (Harian)", harga: "Rp 800.000", ket: "Minimal 3 Hari" },
			{ tipe: "Lepas Kunci (Bulanan)", harga: "Rp 12.000.000", ket: "Minimal 1 Bulan" },
		],
		desc: "Daihatsu Gran Max Mini Bus, solusi transportasi grup kecil.",
	},
];

export default function DetailMobilPage({ params }: { params: { id: string } }) {
	const vehicle = vehicles.find(v => v.id === params.id) || vehicles[0];

	return (
		<div
			className="min-h-screen"
			style={{
				backgroundImage: "url('/image/background_landscape.png')",
				backgroundSize: "100% 100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Header */}
			<div className=" py-2 px-4 text-white text-sm flex justify-between items-center">
				{/* <span>PT PORTAMA JAYA TRANSPORTASI</span> */}
				{/* <span>Rental Mobil Jakarta | Sewa {vehicle.name} Jakarta</span> */}
			</div>
			<header className="text-white py-8 px-4 flex flex-col md:flex-row items-center justify-between">
				<div className="max-w-xl">
					<h1 className="text-3xl md:text-4xl font-bold mb-4">Sewa {vehicle.name} Jakarta</h1>
					<p className="mb-4">{vehicle.desc}</p>
				</div>
				<div className="flex-shrink-0 mt-6 md:mt-0">
					<Image src={vehicle.image} alt={vehicle.name} width={400} height={220} className="rounded-lg bg-white" />
				</div>
			</header>

			{/* Formulir Rental
			<div className="py-3 text-center text-white font-bold text-lg">
				Formulir Rental Mobil {vehicle.name}
			</div> */}

			{/* Harga Sewa Table */}
			<section className="bg-[#f5f5f5] py-8">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-xl font-bold mb-4 text-center">Harga Sewa {vehicle.name} di Jakarta</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm bg-white rounded shadow">
							<thead>
								<tr className="bg-gray-100">
									<th className="py-2 px-2">Tipe Layanan</th>
									<th className="py-2 px-2">Harga</th>
									<th className="py-2 px-2">Keterangan</th>
								</tr>
							</thead>
							<tbody>
								{vehicle.harga.map((h, i) => (
									<tr key={i}>
										<td className="py-2 px-2">{h.tipe}</td>
										<td className="py-2 px-2 font-bold text-blue-600">{h.harga}</td>
										<td className="py-2 px-2">{h.ket}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Kalkulator Sewa Dummy
				<div className="max-w-md mx-auto mt-8 bg-white rounded shadow p-6">
					<h3 className="font-bold mb-2">Kalkulator Sewa {vehicle.name} Jakarta</h3>
					<form className="space-y-2">
						<input className="w-full border px-3 py-2 rounded" placeholder="Tanggal Sewa" disabled />
						<input className="w-full border px-3 py-2 rounded" placeholder="Durasi (hari)" disabled />
						<input className="w-full border px-3 py-2 rounded" placeholder="Tipe Layanan" disabled />
						<div className="text-green-600 font-bold mt-2">Total: {vehicle.harga[0].harga}</div>
					</form>
				</div> */}
			</section>

			{/* Galeri Armada */}
			<section className="bg-[#005289] py-8">
				<div className="max-w-5xl mx-auto">
					<h3 className="text-white text-lg font-bold mb-4">Galeri Armada Rental Mobil {vehicle.name}</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Image src={vehicle.image} alt={vehicle.name + " 1"} width={400} height={220} className="rounded" />
						<Image src={vehicle.image} alt={vehicle.name + " 2"} width={400} height={220} className="rounded" />
						<Image src={vehicle.image} alt={vehicle.name + " 3"} width={400} height={220} className="rounded" />
					</div>
				</div>
			</section>

			{/* Penjelasan & Keunggulan */}
			<section className="bg-white py-8">
				<div className="max-w-3xl mx-auto space-y-8">
					<div>
						<h3 className="font-bold text-lg mb-2">Sewa {vehicle.name} Jakarta: Solusi Transportasi Mewah & Premium untuk Segala Kebutuhan</h3>
						<Image src={vehicle.image} alt={vehicle.name + " Premium"} width={600} height={320} className="rounded mb-2" />
						<p>{vehicle.desc}</p>
					</div>
					<div>
						<h4 className="font-bold mb-1">Keunggulan {vehicle.name} yang Kami Sediakan</h4>
						<ul className="list-disc ml-6">
							<li>Armada terbaru & terawat</li>
							<li>Driver profesional & berpengalaman</li>
							<li>Interior mewah & fitur premium</li>
							<li>Proses booking mudah & cepat</li>
						</ul>
					</div>
					<div>
						<h4 className="font-bold mb-1">Mengapa Sewa Mobil {vehicle.name} Jakarta Kami?</h4>
						<Image src={vehicle.image} alt={vehicle.name + " Limousine"} width={600} height={320} className="rounded mb-2" />
						<p>
							Kami berkomitmen memberikan pengalaman terbaik dengan pelayanan ramah, harga transparan, dan armada siap pakai setiap saat.
						</p>
					</div>
					<div>
						<h4 className="font-bold mb-1">Dapatkan Pengalaman Berkendara Premium Sekarang Juga</h4>
						<Image src={vehicle.image} alt={vehicle.name + " Hitam"} width={600} height={320} className="rounded mb-2" />
						<p>
							Hubungi kami untuk konsultasi dan pemesanan. Tim kami siap membantu kebutuhan transportasi Anda 24 jam.
						</p>
					</div>
				</div>
			</section>

			{/* Syarat & Ketentuan */}
			<section className="bg-[#005289] py-8">
				<div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
					<h3 className="font-bold text-lg mb-4 text-[#005289]">Syarat & Ketentuan</h3>
					<ol className="list-decimal ml-6 text-sm space-y-2">
						<li>Pelanggan dapat melakukan order armada kendaraan maksimal H-1 hari (satu hari sebelumnya)</li>
						<li>PT Portama Jaya Transportasi akan menjalankan orderan selama 12 jam, apabila terhitung lebih akan dihitung overtime dan biaya overtime dihitung sebesar 10% per jam.</li>
						<li>Apabila ada pembatalan orderan armada pada Hari-H akan dikenakan pinalti sebesar 50% dari harga yang telah disepakati. Apabila jasa order keluar dari wilayah yang telah disepakati, maka harga disesuaikan oleh PT Portama Jaya Transportasi.</li>
						<li>Satu hari sewa dihitung dari jam 00:00 sampai dengan jam 23:59 di hari yang sama (bukan dihitung 24 jam dari order)</li>
						<li>Pemakaian 1 hari di weekend ada tambahan baiaya Rp. [*]</li>
						<li>Libur nasional minimal sewa tentatif</li>
					</ol>
				</div>
			</section>

			{/* FAQ */}
			<section className="bg-[#005289] py-8">
				<div className="max-w-3xl mx-auto text-white">
					<h3 className="font-bold text-lg mb-4">FAQ Seputar Sewa {vehicle.name} Jakarta</h3>
					<div className="space-y-2">
						<details className="bg-[#222] rounded p-3">
							<summary className="cursor-pointer font-semibold">Berapa harga sewa {vehicle.name} per hari?</summary>
							<div className="mt-2">Harga mulai dari {vehicle.harga[0].harga} di Jakarta, tergantung durasi dan tipe layanan.</div>
						</details>
						<details className="bg-[#222] rounded p-3">
							<summary className="cursor-pointer font-semibold">Apakah bisa lepas kunci?</summary>
							<div className="mt-2">Bisa, minimal sewa 3 hari untuk lepas kunci.</div>
						</details>
						<details className="bg-[#222] rounded p-3">
							<summary className="cursor-pointer font-semibold">Apakah harga sudah termasuk BBM?</summary>
							<div className="mt-2">Belum, harga exclude BBM, tol, parkir, makan driver.</div>
						</details>
						<details className="bg-[#222] rounded p-3">
							<summary className="cursor-pointer font-semibold">Bagaimana cara booking?</summary>
							<div className="mt-2">Hubungi kami via WhatsApp untuk reservasi dan konsultasi.</div>
						</details>
					</div>
				</div>
			</section>

			{/* CTA Booking */}
			<section className="bg-[#005289] py-8 text-center">
				<h3 className="text-2xl font-bold mb-2 text-white">Tunggu Apa Lagi?</h3>
				<p className="text-white mb-4">
					Hubungi WhatsApp kami untuk booking {vehicle.name} atau armada lain di Jakarta. Layanan 24 jam, harga transparan, armada terawat!
				</p>
				<div className="space-y-2">
					<div className="space-y-2 mt-2">
						<Button asChild className="w-50 bg-green-500 hover:bg-green-600" size="lg">
							<a
								href={`https://wa.me/6281315393681?text=Halo,%20saya%20tertarik%20untuk%20sewa%20mobil%20${encodeURIComponent(vehicle.name)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-2"
							>
								<Phone className="h-2 w-2" />
								Chat via WhatsApp
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}

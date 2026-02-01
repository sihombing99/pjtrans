"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Car, Menu, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang" },
  { name: "Layanan", href: "/layanan" },
  { name: "Harga & Armada", href: "/harga" },
  { name: "Kontak", href: "/kontak" },
 
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = !!pathname && pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        {/* Menggunakan relative agar tombol kanan bisa diposisikan absolute jika perlu */}
        <div className="relative flex h-24 items-center justify-center">
          
          {/* Container Tengah: Logo + Navigasi */}
          <div className="flex items-center gap-8 md:gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image 
                src="/image/pjtrans.png" 
                alt="PJTrans Logo" 
                className="h-16 w-auto md:h-20 md:w-52 object-contain" 
                width={208} 
                height={80} 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-base font-semibold transition-colors hover:text-blue-600 whitespace-nowrap",
                    pathname === item.href ? "text-blue-600" : "text-gray-700",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {/* Admin-only links when on admin routes */}
              {isAdmin && (
                <>
                  <Link
                    href="/admin"
                    className={cn(
                      "text-base font-semibold transition-colors hover:text-blue-600 whitespace-nowrap",
                      pathname === "/admin/tambah-mobil" ? "text-blue-600" : "text-gray-700",
                    )}
                  >
                    Tambah Mobil
                  </Link>
                  <Link
                    href="/admin/slideshow"
                    className={cn(
                      "text-base font-semibold transition-colors hover:text-blue-600 whitespace-nowrap",
                      pathname === "/admin/slideshow" ? "text-blue-600" : "text-gray-700",
                    )}
                  >
                    Slideshow
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Container Kanan: Tombol WhatsApp */}
          {/* Menggunakan absolute agar tidak mengganggu posisi center logo & menu */}
          <div className="absolute right-0 hidden md:flex items-center flex-shrink-0">
            <Button asChild className="bg-green-600 hover:bg-green-800">
              <a
                href="https://wa.me/6281315393681?text=..."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Navigation Trigger (Tetap di kanan saat mobile) */}
          <div className="absolute right-0 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col p-4 gap-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-base font-semibold transition-colors hover:text-blue-600",
                        pathname === item.href ? "text-blue-600" : "text-gray-700",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin/tambah-mobil"
                        className={cn(
                          "text-base font-semibold transition-colors hover:text-blue-600",
                          pathname === "/admin/tambah-mobil" ? "text-blue-600" : "text-gray-700",
                        )}
                      >
                        Tambah Mobil
                      </Link>
                      <Link
                        href="/admin/slideshow"
                        className={cn(
                          "text-base font-semibold transition-colors hover:text-blue-600",
                          pathname === "/admin/slideshow" ? "text-blue-600" : "text-gray-700",
                        )}
                      >
                        Slideshow
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
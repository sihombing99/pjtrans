import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import AuthProvider from "@/components/AuthProvider" // <-- 1. Impor AuthProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PJTrans — Sewa Mobil & Transportasi Indonesia",
  description:
    "PJTrans menyediakan layanan sewa mobil dengan sopir dan lepas kunci. Melayani Jabodetabek & 80+ kota di Indonesia.",
  icons: {
    icon: "/image/favicon.png",
  },
  openGraph: {
    title: 'PJTrans — Sewa Mobil & Transportasi Indonesia',
    description: 'Sewa mobil harian, bulanan, lepas kunci, dan antar-jemput bandara. Armada terawat dan sopir profesional.',
    url: 'https://pjtrans.co.id',
    siteName: 'PJTrans',
    locale: 'id_ID',
    type: 'website',
    images: ['/image/logo.webp']
  },
  twitter: { card: 'summary_large_image', creator: '@pjtrans' },
  keywords: [
    'sewa mobil',
    'rental mobil',
    'PJTrans',
    'sewa mobil Jakarta',
    'antar jemput bandara'
  ],
  generator: 'nextjs'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        <link rel="icon" href="/image/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/image/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/image/favicon.png" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PT Portama Jaya Transportasi",
              "url": "https://www.pjtrans.co.id",
              "logo": "/image/logo.webp",
              "sameAs": [
                "https://www.instagram.com/pjtrans",
                "https://wa.me/6281315393681"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+62-813-1539-3681",
                  "contactType": "customer service",
                  "areaServed": "ID"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PJTrans - Rental Mobil Murah Terbaik Jakarta & Indonesia",
              "alternateName": ["PJTrans", "Rental Mobil Terpercaya", "Sewa Mobil Jakarta", "PT Portama Jaya Transportasi"],
              "description": "Layanan rental mobil murah terbaik dengan sopir profesional. Sewa mobil terpercaya untuk kebutuhan harian, bisnis, dan wisata. Melayani bandara, antar-jemput, dan seluruh Indonesia dengan armada berkualitas.",
              "image": "/image/logo.webp",
              "@id": "https://pjtrans.co.id",
              "url": "https://pjtrans.co.id",
              "telephone": "+6281315393681",
              "keywords": "rental mobil, sewa mobil, rental mobil murah, rental mobil terbaik, rental mobil jakarta, rental mobil terpercaya, rental mobil 24/7, sewa mobil dengan sopir, rental mobil lepas kunci, rental mobil harian, rental mobil bulanan, rental mobil bandara, rental mobil wisata, rental mobil terjangkau, rental mobil berkualitas, sewa mobil profesional, rental mobil online, booking rental mobil",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Jakarta",
                "addressCountry": "ID"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PJTrans",
              "url": "https://pjtrans.co.id",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://pjtrans.co.id?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        {/* 2. Bungkus semua konten dengan AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

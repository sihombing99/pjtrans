/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizePackageImports: ['lucide-react'],
   serverExternalPackages: ['@prisma/client', 'prisma'], 
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*',
      },
      {
        source: '/order',
        destination: '/order/index.html',
      },
    ]
  },
}

export default nextConfig

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
    ]
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/health_aging_coach',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

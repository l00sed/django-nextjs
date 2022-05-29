/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '192.168.0.104',
      '192.168.0.104:8000',
      '192.168.0.104:3000',
    ],
  },
}

module.exports = nextConfig

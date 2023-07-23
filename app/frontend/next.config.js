/** @type {import('next').NextConfig} */
const path = require('path');

// Config
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  /* TODO: Include logic here to detect application environment.
   * Switch between development and production domain. */
  assetPrefix: 'https://loosed.local',
  output: 'standalone',
  images: {
    domains: [
      'localhost',
      'localhost:8000',
      'http://localhost',
      'https://localhost',
      'http://localhost:8000',
      'https://localhost:8000',
      '127.0.0.1',
      '127.0.0.1:8000',
      'http://127.0.0.1',
      'https://127.0.0.1',
      'http://127.0.0.1:8000',
      'https://127.0.0.1:8000',
      '0.0.0.0',
      '0.0.0.0:8000',
      'http://0.0.0.0',
      'https://0.0.0.0',
      'http://0.0.0.0:8000',
      'https://0.0.0.0:8000',
      'backend',
      'backend:8000',
      'http://backend',
      'https://backend',
      'http://backend:8000',
      'https://backend:8000',
      'loosed.local',
      'loosed.local:8000',
      'http://loosed.local',
      'https://loosed.local',
      'http://loosed.local:8000',
      'https://loosed.local:8000',
    ],
  },
  /* Fixes 404 on webpack-hmr when dockerizing the app */
  swcMinify: true,
  // except for webpack, other parts are left as generated
  webpack: (config, _context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  }
  //webpack(config) {
  //  config.infrastructureLogging = { debug: /PackFileCache/ }
  //  return config;
  //}
}

module.exports = nextConfig

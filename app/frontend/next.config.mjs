/** @type {import('next').NextConfig} */
import * as path from 'path';
import * as url from 'url';
//const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Config
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  /* TODO: Include logic here to detect application environment.
   * Switch between development and production domain. */
  assetPrefix: 'https://loosed.local',
  //output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '443'
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '80'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: ''
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '443'
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: ''
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '80'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: ''
      },
      {
        protocol: 'https',
        hostname: '0.0.0.0',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: '0.0.0.0',
        port: '443'
      },
      {
        protocol: 'https',
        hostname: '0.0.0.0',
        port: ''
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: '8000'
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: '80'
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'backend',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: 'backend',
        port: '443'
      },
      {
        protocol: 'https',
        hostname: 'backend',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8000'
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '80'
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'loosed.local',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: 'loosed.local',
        port: '443'
      },
      {
        protocol: 'https',
        hostname: 'loosed.local',
        port: ''
      },
      {
        protocol: 'http',
        hostname: 'loosed.local',
        port: '8000'
      },
      {
        protocol: 'http',
        hostname: 'loosed.local',
        port: '80'
      },
      {
        protocol: 'http',
        hostname: 'loosed.local',
        port: ''
      }
    ]
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
  },
  //webpack(config) {
  //  config.infrastructureLogging = { debug: /PackFileCache/ }
  //  return config;
  //}
}

export default nextConfig;

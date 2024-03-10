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
    // Workaround for Tailwind dark mode resolution with CSS Modules
    const rules = config.module.rules.find((r) => !!r.oneOf)

    rules.oneOf.forEach((loaders) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((loader) => {
          const isCssLoader =
            typeof loader?.loader === 'string' &&
            /(?<!post)css-loader/.test(loader?.loader)
          const hasGetLocalIdent = !!loader?.options?.modules?.getLocalIdent

          if (isCssLoader && hasGetLocalIdent) {
            const { getLocalIdent } = loader.options.modules
            if (getLocalIdent) {
              loader.options.modules.getLocalIdent = (...args) => {
                if (args.includes('dark')) return 'dark'
                return getLocalIdent(...args)
              }
            }
          }
        })
      }
    })
    return config
  },
  //webpack(config) {
  //  config.infrastructureLogging = { debug: /PackFileCache/ }
  //  return config;
  //}
}

export default nextConfig;

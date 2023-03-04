/** @type {import('next').NextConfig} */
const intercept = require('intercept-stdout')
const path = require('path');

// safely ignore recoil stdout warning messages
// https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

// Intercept in dev and prod
intercept(interceptStdout)

// Config
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
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

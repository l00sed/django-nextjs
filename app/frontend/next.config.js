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
      'localhost:8000',
      '127.0.0.1',
      '127.0.0.1:8000',
      '0.0.0.0',
      '0.0.0.0:8000',
      'loosed.local',
      'loosed.local:8000',
      '192.168.0.104',
      '192.168.0.104:8000',
      '192.168.0.104:3000',
    ],
  },
  /* Fixes 404 on webpack-hmr when dockerizing the app */
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
  //webpack(config) {
  //  config.infrastructureLogging = { debug: /PackFileCache/ }
  //  return config;
  //}
}

module.exports = nextConfig

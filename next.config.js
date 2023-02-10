/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = removeImports({
  ...nextConfig,
});

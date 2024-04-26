const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['edpn.com'],
  },
  eslint: { dirs: ['.'] },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://duval.edpn.io:8080/api/:path*',
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

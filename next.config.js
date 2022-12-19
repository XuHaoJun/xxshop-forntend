/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
    transpilePackages: ['ui'],
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);

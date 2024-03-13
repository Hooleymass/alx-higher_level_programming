/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.kenyaplus.co.ke',
        port: '',
        pathname: '/wp/**',
      },
    ],
  },
};

module.exports = nextConfig;

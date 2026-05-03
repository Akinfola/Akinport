/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'themewagon.github.io',
      },
    ],
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      {
        source: '/api/contact',
        destination: isDev 
          ? 'http://localhost:5000/api/contact'
          : 'https://akinport.onrender.com/api/contact',
      },
    ];
  },
};

module.exports = nextConfig;

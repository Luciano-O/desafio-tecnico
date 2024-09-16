/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;

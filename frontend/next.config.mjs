/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'desafio-tecnico-yzpm.onrender.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;

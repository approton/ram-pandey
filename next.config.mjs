/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-development' : '.next-production',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};
export default nextConfig;

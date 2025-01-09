/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      images: {
        domains: ['utfs.io'], // Add the hostname here
      },
};

export default nextConfig;

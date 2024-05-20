/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    webpack: (config) => {
        return config;
    },
};

export default nextConfig;

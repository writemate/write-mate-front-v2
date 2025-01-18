/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';

dotenv.config();

const nextConfig = {
    reactStrictMode: false,
    compiler:{
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
    
        return config;
    },
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: `${process.env.API_URL}/:path*`,
        },
        ];
    },
};

export default nextConfig;

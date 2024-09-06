/** @type {import('next').NextConfig} */
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
            destination: 'https://fuk1eiks47.execute-api.ap-northeast-2.amazonaws.com/dev/:path*',
        },
        ];
    },
};

export default nextConfig;

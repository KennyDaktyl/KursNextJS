// next.config.js

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        typedRoutes: true,
        mdxRs: true
    },
    images: {
        domains: ['naszsklep-api.vercel.app'],
    },
    async redirects() {
        return [
            {
                source: '/products',
                destination: '/products/1',
                permanent: true,
            },
        ];
    },
};

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)

module.exports = nextConfig;

// next.config.js

const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        typedRoutes: true,
        mdxRs: true,
    },
    images: {
        domains: ['naszsklep-api.vercel.app', 'localhost:3000', 'static-ourstore.hyperfunctor.com'],
    },
    redirects: async () => {
        return [
            {
                source: '/products',
                destination: '/products/1',
                permanent: true,
            },
            {
                source: '/categories/t-shirts',
                destination: '/categories/t-shirts/1',
                permanent: false,
            },
            {
                source: '/categories/hoodies',
                destination: '/categories/hoodies/1',
                permanent: false,
            },
            {
                source: '/categories/accessories',
                destination: '/categories/accessories/1',
                permanent: false,
            },
        ];
    },
};

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)

module.exports = nextConfig;

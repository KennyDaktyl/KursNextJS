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
};

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)

module.exports = nextConfig;

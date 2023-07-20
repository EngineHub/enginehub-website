/** @type {import('next').NextConfig} */
export default {
    env: {
        GA_TRACKING_ID: 'UA-139849956-1'
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    transpilePackages: ['@enginehub/shared']
};

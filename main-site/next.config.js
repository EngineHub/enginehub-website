/** @type {import('next').NextConfig} */
export default {
    env: {
        GA_TRACKING_ID: 'UA-139849956-1'
    },
    reactCompiler: true,
    transpilePackages: ['@enginehub/shared']
};

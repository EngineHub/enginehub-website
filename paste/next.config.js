const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['shared']);

module.exports = withTM(
    withImages({
        target: 'serverless',
        distDir: 'build',
        env: {
            GA_TRACKING_ID: 'UA-139849956-4'
        },
        async rewrites() {
            return [
                {
                    source: '/paste',
                    destination: '/api/paste'
                },
                {
                    source: '/signed_paste',
                    destination: '/api/signed_paste'
                },
                {
                    source: '/documents/:slug',
                    destination: '/api/documents/:slug'
                }
            ];
        },
        experimental: {
            sprFlushToDisk: false
        }
    })
);

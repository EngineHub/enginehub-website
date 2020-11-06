const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['shared']);

module.exports = withTM(
    withImages({
        target: 'serverless',
        distDir: 'build',
        env: {
            GA_TRACKING_ID: 'UA-139849956-5'
        },
        experimental: {
            sprFlushToDisk: false
        }
    })
);

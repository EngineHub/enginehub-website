const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['shared']);

module.exports = withImages(withTM(
    {
        env: {
            GA_TRACKING_ID: 'UA-139849956-5'
        }
    })
);

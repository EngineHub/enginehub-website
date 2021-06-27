const withImages = require('next-images');

module.exports = withImages(
    {
        env: {
            GA_TRACKING_ID: 'UA-139849956-5'
        }
    }
);

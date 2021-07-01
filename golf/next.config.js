const prod = process.env.NODE_ENV === 'production';

const API_PREFIX = prod ? 'https://worldedit.golf' : 'http://localhost:3000';

module.exports = {
    env: {
        API_PREFIX,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        BROKER_API_KEY: process.env.BROKER_API_KEY,
        BROKER_API_HOSTNAME: process.env.BROKER_API_HOSTNAME,
        GA_TRACKING_ID: 'UA-139849956-6'
    }
};

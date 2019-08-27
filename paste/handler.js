const compat = require('next-aws-lambda');

module.exports = page => {
    const handler = (event, context, callback) => {
        global['clientIp'] = event['requestContext']['identity']['sourceIp'];
        // this makes sure the next page renders
        compat(page)(event, context, callback);
    };
    return handler;
};

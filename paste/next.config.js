module.exports = {
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
    async headers() {
        return [
            {
                // matching signed paste route
                source: '/signed_paste',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: '*'
                    }
                ]
            },
            {
                // matching signed paste route
                source: '/api/signed_paste',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: '*'
                    }
                ]
            }
        ];
    },
    compiler: {
        styledComponents: true
    }
};

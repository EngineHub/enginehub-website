const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withImages = require('next-images')

const prod = process.env.NODE_ENV === 'production';
const ASSETS_PREFIX = 'https://paste-static.enginehub.org';

module.exports = withImages({
    target: 'serverless',
    assetPrefix: prod ? ASSETS_PREFIX : undefined,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: [['react-app', { flow: false, typescript: true }]]
            }
        });
        config.resolve.extensions.push(".ts", ".tsx");
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsPlugin());
        } else {
            config.resolve.plugins = [new TsconfigPathsPlugin()];
        }
        return config;
    },
    env: {
        STATIC_PREFIX: prod ? ASSETS_PREFIX : '',
        GA_TRACKING_ID: 'UA-139849956-4'
    }
});

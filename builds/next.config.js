const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withImages = require('next-images')

module.exports = withImages({
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
        GA_TRACKING_ID: 'UA-139849956-5'
    }
});

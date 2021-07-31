const DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs',
        filename: 'index.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-helmet': 'react-helmet',
        'styled-components': 'styled-components'
    },
    plugins: [
        new DeclarationBundlerPlugin({
            moduleName: '"@enginehub/shared"',
            out: 'index.d.ts'
        })
    ]
};

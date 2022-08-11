module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        libraryTarget: 'module',
        filename: 'index.esm.js',
        environment: { module: true }
    },
    experiments: {
        outputModule: true
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
        'styled-components': 'styled-components',
        'next/link': 'next/link',
        'next/head': 'next/head'
    }
};

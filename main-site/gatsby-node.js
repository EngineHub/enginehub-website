/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
'use strict';

try {
    const path = require('path');
    const tsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

    exports.onCreateWebpackConfig = ({ actions }) => {
        actions.setWebpackConfig({
            resolve: {
                plugins: [
                    new tsconfigPathsPlugin({
                        configFile: path.resolve(__dirname, 'tsconfig.json')
                    })
                ]
            }
        });
    };
} catch (e) {
    console.error(e);
    process.exit(1);
}

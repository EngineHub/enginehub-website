const path = require('path');
module.exports = {
    extends: '../.eslintrc.js',
    parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname
    }
};

const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname),
        filename: 'js/bundle.js',
        clean: false
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js']
    },

    stats: 'errors-warnings'
};

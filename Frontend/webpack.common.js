const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['@babel/polyfill', './app/index.js'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test:/\.(js)$/, use:'babel-loader'},
            { test: /\.(eot|ttf|woff2?|otf|svg|png|jpe?g|gif)$/, loader:'file-loader' }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({template:'./app/index.html'})
    ],
}
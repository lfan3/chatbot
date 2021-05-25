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
            {test:/\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.(eot|ttf|woff2?|otf|svg|png|jpe?g|gif)$/, loader:'file-loader' }
        ]
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    plugins : [
        new HtmlWebpackPlugin({template:'./app/index.html'})
    ],
    devServer: {
        historyApiFallback: true,
        port: 8085
    },
}
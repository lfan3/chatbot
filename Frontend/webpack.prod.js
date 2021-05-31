const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {test:/\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']},
        ]
    },
    optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`,
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
          })
        ],
      },
});
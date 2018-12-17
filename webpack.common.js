const path = require('path')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      template: 'src/index.html',
    }),
  ],
}

const path = require('path')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const HtmlPlugin = require('html-webpack-plugin')
const CSSExtractor = require('mini-css-extract-plugin')

const PostCSSConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
}

const CSSModuleConfig = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
  },
}

const CSSConfig = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
  },
}

module.exports = merge(
  {},
  {
    mode: 'development',
    devtool: 'source-map',
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
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [CSSExtractor.loader, CSSConfig, PostCSSConfig, 'sass-loader'],
        },
        {
          test: /\.module\.scss$/,
          use: [CSSExtractor.loader, CSSModuleConfig, PostCSSConfig, 'sass-loader'],
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
      new CSSExtractor({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  }
)

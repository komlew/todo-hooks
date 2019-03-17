if (!process || !process.env || typeof process.env.PWD !== 'string') {
  process.exit(1);
}

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

const outputFolder = process.env.PWD;

module.exports = env => ({
  mode: env.production ? 'production' : 'development',
  entry: {
    app: ['./src/index.jsx'],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
  },
  output: env.production
    ? {
        filename: '[name].bundle.js',
        path: `${outputFolder}/docs`,
      }
    : {
        filename: '[name].bundle.js',
        path: outputFolder,
        publicPath: 'https://localhost:3000/',
        sourceMapFilename: '[name].bundle.js.map',
      },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|flow-typed)/,
        loader: 'babel-loader?cacheDirectory',
      },
    ],
  },
  devServer: env.production
    ? {}
    : {
        contentBase: outputFolder,
        clientLogLevel: 'none',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        noInfo: true,
        https: true,
        port: 3000,
        hot: true,
      },
  devtool: env.production ? '' : 'source-map',
  optimization: env.production
    ? {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
            },
          }),
        ],
      }
    : {},
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      appMountHtmlSnippet:
        '<div style="text-align:center;font-size:1.5rem;line-height:100vh;color:#ccc">Loading...</div>',
      headHtmlSnippet:
        '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">' +
        '<style>body{margin:0;font:18px/1.2 Helvetica,Arial,sans-serif}</style>',
      lang: 'en-US',
      title: 'To Do App',
    }),
  ].concat(env.production ? [] : [new webpack.HotModuleReplacementPlugin()]),
});

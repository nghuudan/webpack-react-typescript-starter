const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',

  entry: path.join(__dirname, 'index'),

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },

  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

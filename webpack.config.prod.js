const baseConfig = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[chunkhash].css',
});

module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',

  mode: 'production',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: { outputStyle: 'compressed' },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },

  plugins: [
    ...baseConfig.plugins,
    extractSass,
  ],
});

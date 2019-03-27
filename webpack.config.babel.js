const Path = require('path');
const Webpack = require('webpack');
const sass = require('node-sass');
const SassUtilsConstructor = require('node-sass-utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TranslationTable = require('./src/TranslationTable');
const { features } = require('./src/constants');

const BUILD_DIR = Path.resolve(__dirname, 'public/script');
const sassUtils = SassUtilsConstructor(sass);

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    bundle: [
      '@babel/polyfill',
      'webpack-hot-middleware/client?path=/conditions/script/__webpack_hmr',
      './src/index.jsx',
    ],
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/conditions/script/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: new RegExp(`^/${TranslationTable.getIn(['applicationPath', 'fr'])}`),
          to: TranslationTable.getIn(['applicationPath', 'en']),
        },
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },

      {
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8000 },
        }],
      },

      {
        test: /\.s?css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              functions: {
                'getFeatureColors($feature)':
                  feature => sassUtils.castToSass(features[feature.getValue()]),
              },
            },
          },
        ],
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: { prefix: 'fonts/' },
        },
      },

      {
        test: /\.md$/,
        use: 'raw-loader',
      },

      {
        test: /\.modernizrrc.js$/,
        use: ['modernizr-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      modernizr$: Path.resolve(__dirname, '.modernizrrc.js'),
      'react-spring/renderprops': Path.resolve(__dirname, 'node_modules/react-spring/renderprops.cjs'),
    },
  },

  // NB: Plugins object is *replaced* in production!
  // See webpack.prod.config.js
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

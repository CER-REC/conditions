import Path from 'path';
import Webpack from 'webpack';
import TranslationTable from './app/TranslationTable';

const BUILD_DIR = Path.resolve(__dirname, 'public/script');

module.exports = {
  entry: {
    bundle: [
      'webpack-hot-middleware/client?path=/conditions/script/__webpack_hmr',
      './app/index.js',
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [],
          },
        },
      },

      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' }, // creates style nodes from JS strings
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { url: false },
          },
          { loader: 'sass-loader' }, // compiles Sass to CSS
        ],
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
    },
  },

  // NB: Plugins object is *replaced* in production!
  // See webpack.prod.config.js
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

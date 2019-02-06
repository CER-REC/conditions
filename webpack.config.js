import Path from 'path';
import Webpack from 'webpack';
import TranslationTable from './src/TranslationTable';

const BUILD_DIR = Path.resolve(__dirname, 'public/script');

module.exports = {
  mode: 'development',
  entry: {
    bundle: [
      'webpack-hot-middleware/client?path=/conditions/script/__webpack_hmr',
      './src/index.js',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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

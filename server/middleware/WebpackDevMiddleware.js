import Express from 'express';
import Webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config';

const compiler = Webpack(webpackConfig);

export default () => {
  const app = Express();
  app.use('/conditions/script', WebpackDevMiddleware(compiler));
  app.use('/conditions/script', WebpackHotMiddleware(compiler));
  return app;
};

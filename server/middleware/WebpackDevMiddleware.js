import Express from 'express';
import Webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack.config';

const compiler = Webpack(webpackConfig);

export default () => {
  const app = Express();
  app.use('/script', WebpackDevMiddleware(compiler));
  app.use('/script', WebpackHotMiddleware(compiler));
  return app;
};

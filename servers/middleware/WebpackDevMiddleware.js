const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const Webpack = require('webpack');
const Express = require('express');

const Config = require('../../webpack.config.babel.js');

const compiler = Webpack(Config);
module.exports = () => {
  const app = Express();
  app.use('/script', WebpackDevMiddleware(compiler, {
    // options
  }));
  app.use('/script', WebpackHotMiddleware(compiler));
  return app;
};

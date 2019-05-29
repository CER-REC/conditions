/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import hot from 'webpack-hot-middleware';
import dev from 'webpack-dev-middleware';
import webpack from 'webpack';
import express from 'express';

const Config = require('../../webpack.config.babel.js');

const compiler = webpack(Config);
const WebpackDevMiddleware = () => {
  const app = express();
  app.use('/script', dev(compiler, {
    // options
  }));
  app.use('/script', hot(compiler));
  return app;
};

export default WebpackDevMiddleware;

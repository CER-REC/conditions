const Express = require('express');
const Path = require('path');
const ApplicationRoot = require('../../ApplicationRoot.js');

const PublicFilesMiddleware = () => {
  const app = Express();
  app.use(Express.static(Path.join(ApplicationRoot, 'public')));
  app.use(Express.static(Path.join(ApplicationRoot, 'devPublic')));
  app.use('/data', Express.static(Path.join(ApplicationRoot, 'data')));
  return app;
};
module.exports = PublicFilesMiddleware;

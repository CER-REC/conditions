const Express = require('express');
const Path = require('path');
const ApplicationRoot = require('../../ApplicationRoot.js');

const PublicFilesMiddleware = () => {
  const app = Express();
  app.use(Express.static(Path.join(ApplicationRoot, 'public')));
  app.use(Express.static(Path.join(ApplicationRoot, 'devPublic')));
  return app;
};
module.exports = PublicFilesMiddleware;

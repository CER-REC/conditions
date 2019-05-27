import express from 'express';
import path from 'path';
import mustacheExpress from 'mustache-express';

const ApplicationRoot = require('../../ApplicationRoot.js');

const DevelopmentPageMiddleware = () => {
  const app = express();

  // view engine setup
  app.engine('mustache', mustacheExpress());

  app.set('views', path.join(ApplicationRoot, 'servers', 'views'));
  app.set('view engine', 'mustache');

  const router = express.Router();

  router.get('/', (req, res) => {
    res.render('app', { title: 'WET 4.0.20' });
  });

  // NB: Don't try to use regexes to glob all of the visualization paths
  // The w+ regex doesn't properly grab some characters used in French
  router.get('/*', (req, res) => {
    res.render('app', { title: 'WET 4.0.20' });
  });

  app.use(router);

  // Turn off caching!
  app.disable('view cache');

  return app;
};

export default DevelopmentPageMiddleware;

import path from 'path';
import Server from '../Server';
import ApplicationRoot from '../../ApplicationRoot';
import DevelopmentPageMiddleware from '../middleware/DevelopmentPageMiddleware';
import WebpackDevMiddleware from '../middleware/WebpackDevMiddleware';
import PublicFilesMiddleware from '../middleware/PublicFilesMiddleware';

require('dotenv').config({
  path: path.join(ApplicationRoot, 'servers/DevelopmentServer/.env'),
});

Server([
  PublicFilesMiddleware(),
  WebpackDevMiddleware(),
  DevelopmentPageMiddleware(),
]);

const Path = require('path');
const ApplicationRoot = require('../../ApplicationRoot.js');
const DevelopmentPageMiddleware = require('../middleware/DevelopmentPageMiddleware.js');
const WebpackDevMiddleware = require('../middleware/WebpackDevMiddleware');
const PublicFilesMiddleware = require('../middleware/PublicFilesMiddleware');

require('dotenv').config({
  path: Path.join(ApplicationRoot, 'servers/DevelopmentServer/.env'),
});

const Server = require('../Server.js');

Server([
  PublicFilesMiddleware(),
  WebpackDevMiddleware(),
  DevelopmentPageMiddleware(),
]);

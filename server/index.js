import Path from 'path';
import Express from 'express';
import MustacheExpress from 'mustache-express';
import Compression from 'compression';
import WebpackDevMiddleware from './middleware/WebpackDevMiddleware';
import BitlyMiddleware from './middleware/BitlyMiddleware';
import Tr from '../app/TranslationTable';

// Prepare the Express app for the incident visualization
const app = Express();

// Set up static files
app.use('/conditions', Express.static(Path.resolve(__dirname, '../public')));
app.use('/conditions', Express.static(Path.resolve(__dirname, '../devPublic')));
app.use('/data', Express.static(Path.resolve(__dirname, '../data')));

// Set up development pages
app.engine('mustache', MustacheExpress());
app.set('views', Path.resolve(__dirname, './views'));
app.set('view engine', 'mustache');

const router = Express.Router();
router.get('/screenshot', (req, res) => res.render('screenshot'));
router.get('/', (req, res) => res.render('app', { title: 'WET 4.0.20' }));
Tr.getIn(['applicationPath']).forEach((path) => {
  router.get(`/${path}/`, (req, res) => res.render('app', { title: 'WET 4.0.20' }));
});

app.use(router);

// Turn off caching!
app.disable('view cache');

app.use(WebpackDevMiddleware());
app.use(BitlyMiddleware());
app.use(Compression());

app.use((req, res) => res.status(404).send('404: Not Found.'));

app.listen(3005, () => {
  /* eslint-disable no-console */
  console.log(`Ready: http://localhost:3005/${Tr.getIn(['applicationPath', 'en'])}`);
  console.log(`Ready: http://localhost:3005/${Tr.getIn(['applicationPath', 'fr'])}`);
  /* eslint-enable no-console */
});

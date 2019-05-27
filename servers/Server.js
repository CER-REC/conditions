import Express from 'express';
import Tr from '../src/TranslationTable';
import Compression from 'compression';

// Compression = require('compression')

function Server(middlewares) {
  // Prepare the Express app for the incident visualization
  const app = Express();
  middlewares.forEach(middleware => app.use(middleware));

  const rootApp = Express();

  rootApp.use(Compression());

  // Host the visualization app with both French and English endpoints
  rootApp.use(`/${Tr.getIn(['applicationPath', 'en'])}`, app);
  rootApp.use(`/${Tr.getIn(['applicationPath', 'fr'])}`, app);

  rootApp.use((req, res) => { res.status(404).send('404: Not Found.'); });

  rootApp.listen(process.env.PORT || process.env.PORT_NUMBER, () => {
    /* eslint-disable no-console */
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}/${Tr.getIn(['applicationPath', 'en'])}`);
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}/${Tr.getIn(['applicationPath', 'fr'])}`);
    return rootApp.emit('server-online');
  });
  return rootApp;
}
module.exports = Server;

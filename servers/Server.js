import Express from 'express';
import Compression from 'compression';
import { applicationPath } from '../src/constants';

const Server = (middlewares) => {
  // Prepare the Express app for the incident visualization
  const app = Express();
  middlewares.forEach(middleware => app.use(middleware));

  const rootApp = Express();

  rootApp.use(Compression());

  // Host the visualization app with both French and English endpoints
  rootApp.use(`/${applicationPath.en}`, app);
  rootApp.use(`/${applicationPath.fr}`, app);

  rootApp.use((req, res) => { res.status(404).send('404: Not Found.'); });

  rootApp.listen(process.env.PORT || process.env.PORT_NUMBER, () => {
    /* eslint-disable no-console */
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}/${applicationPath.en}`);
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}/${applicationPath.fr}`);
    return rootApp.emit('server-online');
  });
  return rootApp;
};

export default Server;

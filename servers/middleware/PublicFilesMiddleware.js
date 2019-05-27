import express from 'express';
import path from 'path';
import ApplicationRoot from '../../ApplicationRoot';

const PublicFilesMiddleware = () => {
  const app = express();
  app.use(express.static(path.join(ApplicationRoot, 'public')));
  app.use(express.static(path.join(ApplicationRoot, 'devPublic')));
  return app;
};
export default PublicFilesMiddleware;

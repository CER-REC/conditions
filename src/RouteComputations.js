/* eslint linebreak-style: ["error", "windows"] */
import { appHost } from './constants';
import Tr from './TranslationTable';

const RouteComputations = {
  bitlyParameter(language) {
    return `${appHost}/${Tr.getIn(['applicationPath', language])}/${encodeURIComponent(document.location.search)}`;
  },
  bitlyEndpoint() {
    switch (process.env.NODE_ENV) {
      case 'development': {
        const root = 'http://localhost';
        return `${root}/bitlyService/api/bitlyShortlink`;
      }
      case 'production':
      default:
        return `${document.location.origin}/bitlyService/api/bitlyShortlink`;
    }
  },
  applicationPath(language) {
    return Tr.getIn(['applicationPath', language]);
  },
  appRoot(language) {
    return `${document.location.origin}/${RouteComputations.applicationPath(language)}`;
  },
};
export default RouteComputations;

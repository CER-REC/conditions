import { appHost, applicationPath } from './constants';

const RouteComputations = {
  bitlyParameter(language) {
    return `${appHost}/${applicationPath[language]}/${encodeURIComponent(document.location.search)}`;
  },
  bitlyEndpoint() {
    return `${document.location.origin}/bitlyService/api/bitlyShortlink`;
  },
  applicationPath(language) {
    return applicationPath[language];
  },
  appRoot(language) {
    return `${document.location.origin}/${RouteComputations.applicationPath(language)}`;
  },
};
export default RouteComputations;

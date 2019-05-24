import { createBrowserHistory } from 'history';
import QueryString from 'query-string';
import LZUTF8 from 'lzutf8';
import TR from '../TranslationTable';

let unlistenHistory;
let lastSave = {};
let updatingHistory = false;
let updatingState = false;

const updateStateFromURL = (search, store) => {
  try {
    const { config: configRaw } = QueryString.parse(search);
    if (!configRaw) { return; }
    const config = JSON.parse(LZUTF8.decompress(decodeURIComponent(configRaw), { inputEncoding: 'Base64' }));

    updatingState = true;
    store.dispatch({
      type: 'urlRouteChanged',
      payload: config,
    });
    updatingState = false;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failure reloading state from URL:', e);
  }
};

const stateToURLMiddleware = (store) => {
  // During the middleware instantiation, set up our History listener
  const history = createBrowserHistory();
  // Stop listening to the previous history object
  if (unlistenHistory) { unlistenHistory(); }

  unlistenHistory = history.listen((location) => {
    // Ignore history updates that occur while the middleware is running
    if (updatingHistory === true) { return; }

    updateStateFromURL(location.search, store);
  });

  return next => (action) => {
    next(action);

    // Don't update the URL if we're currently updating the state
    if (updatingState) { return; }

    const state = store.getState();

    const changed = Object.keys(state).some(key => state[key] !== lastSave[key]);
    // If the options havent changed, don't update the URL
    if (changed === false) { return; }
    lastSave = state;

    const stateString = JSON.stringify(state);

    const compressed = encodeURIComponent(LZUTF8.compress(stateString, { outputEncoding: 'Base64' }));

    updatingHistory = true;
    const baseURL = TR.getIn(['applicationPath', 'en']);
    history.push(`${baseURL}?config=${compressed}`);
    updatingHistory = false;
  };
};
export default stateToURLMiddleware;

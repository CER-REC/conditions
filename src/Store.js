import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';
import stateToURLMiddleware, { updateStateFromURL } from './middleware/stateToURLMiddleware';

export default () => {
  const middleware = applyMiddleware(stateToURLMiddleware);
  const store = createStore(
    reducer,
    middleware,
  );
  // Reload the visualization settings from the URL
  updateStateFromURL(document.location.search, store);

  return store;
};

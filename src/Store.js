import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';
import stateToURLMiddleware from './middleware/stateToURLMiddleware';

export default () => {
  const middleware = applyMiddleware(stateToURLMiddleware);
  const store = createStore(
    reducer,
    middleware,
  );
  return store;
};

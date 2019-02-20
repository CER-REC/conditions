import { createStore } from 'redux';

import reducer from './reducer';

export default () => {
  const store = createStore(
    reducer,
  );
  return store;
};

import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';

import App from '.';

const store = createStore();

const AppWithRedux = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

export default AppWithRedux;

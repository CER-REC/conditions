import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewThree from '../ViewThree';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <ViewThree />
  </Provider>
);

export default App;

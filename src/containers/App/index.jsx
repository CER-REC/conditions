import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <ViewTwo />
    <ViewThree />
  </Provider>
);

export default App;

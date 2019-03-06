import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import { conditionCountsByYear, conditionCountsByCommodity, conditionData } from '../../mockData';

const store = createStore();

const props = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionDetails: {
    searchKeywords: {
      include: ['hello'],
    },
    selectedProject: 'Project Name',
    data: conditionData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
  openIntermediatePopup: () => {},
  openProjectDetails: () => {},
};

const App = () => (
  <Provider store={store}>
    <ViewOne />
    {/* TODO: Deployment hacks */}
    <div style={{ clear: 'both' }} />
    <hr />
    <ViewTwo {...props} />
    <hr />
    <ViewThree {...props} />
    <hr />
    <Footer />
  </Provider>
);

export default App;

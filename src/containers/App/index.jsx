import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import { conditionCountsByYear, conditionCountsByCommodity, conditionData } from '../../mockData';

const store = createStore();

const noop = () => {};
const conditionDetailsProps = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  selected: {
    feature: 'theme',
    subFeature: '',
  },
  conditionDetails: {
    isExpandable: true,
    searchKeywords: {
      include: ['hello'],
    },
    selectedProject: 'Project Name',
    selectedItem: {
      instrumentIndex: 0,
      itemIndex: 0,
    },
    data: conditionData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
  updateSelectedItem: noop,
  openIntermediatePopup: noop,
  openProjectDetails: noop,
};

const App = () => (
  <Provider store={store}>
    <ViewOne />
    {/* TODO: Deployment hacks */}
    <div style={{ clear: 'both' }} />
    <hr />
    <ViewTwo {...conditionDetailsProps} />
    <hr />
    <ViewThree {...conditionDetailsProps} />
    <hr />
    <Footer />
  </Provider>
);

export default App;

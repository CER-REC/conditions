import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';
import conditionDetailsData from '../../components/ConditionDetails/testData';

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
    data: conditionDetailsData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
  detailView: false,
  updateSelectedItem: noop,
  openIntermediatePopup: noop,
  expandDetailView: noop,
  openProjectDetails: noop,
  toggleExpanded: noop,
  browseBy: 'company',
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

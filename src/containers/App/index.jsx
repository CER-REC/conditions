import React from 'react';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
  projectsData,
} from '../../mockData';

const cache = new InMemoryCache();
const link = new HttpLink({
  // uri: 'http://178.128.239.141/conditions/graphql',
  uri: 'http://localhost/conditions/graphql',
});
const client = new ApolloClient({ cache, link });

const store = createStore();

const noop = () => {};

const viewProps = {
  projectsData,
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
  openIntermediatePopup: noop,
  openProjectDetails: noop,
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mainInfoBarPane: '' };
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ViewOne />
          {/* TODO: Deployment hacks */}
          <div style={{ clear: 'both' }} />
          <hr />
          <ViewTwo {...viewProps} />
          <hr />
          <ViewThree {...viewProps} />
          <hr />
          <Footer
            setMainInfoBarPane={this.setMainInfoBarPane}
            mainInfoBarPane={this.state.mainInfoBarPane}
            openDataModal={noop}
            openScreenshotModal={noop}
          />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;

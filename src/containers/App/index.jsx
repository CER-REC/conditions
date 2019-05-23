import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';

import * as browseByCreators from '../../actions/browseBy';
import * as transitionStateCreators from '../../actions/transitionState';
import createStore from '../../Store';

import {
  browseByType,
} from '../../proptypes';

import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';
import graphQLEndPoint from '../../../globals';

import Guide from '../../components/Guide';
import BrowseBy from '../../components/BrowseBy';
import GuideTransport from '../../components/GuideTransport';
import './styles.scss';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
} from '../../mockData';

const store = createStore();
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: graphQLEndPoint,
});
const client = new ApolloClient({ cache, link, fetch });

const noop = () => {};

const viewProps = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionDetails: {
    searchKeywords: {
      include: ['hello'],
    },
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
    this.ref = React.createRef();
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  incrementTransitionState = (back) => {
    let currentState = this.props.transitionState;
    if (currentState === 9) { currentState = 0; }
    const newState = Math.min(Math.max(0, currentState + (back ? -1 : 1)), 8);
    if (newState !== this.props.transitionState) {
      this.props.setTransitionState(newState);
    }
  }

  decrementTransitionState = () => this.incrementTransitionState(true);

  jumpToAbout = () => {
    this.props.setTransitionState(8);
    this.setMainInfoBarPane('about');

    // This timer needs to be long enough for React to do its thing and for the
    // CSS transitions to finish so the Footer content is there to scroll to.
    setTimeout(() => {
      this.ref.current.querySelector('.Footer').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  jumpToView1 = () => this.props.setTransitionState(9)

  jumpToView2 = (type) => {
    this.props.setTransitionState(8);
    this.props.setBrowseBy(type);
  }

  jumpToView3 = () => this.props.setTransitionState(10)

  render() {
    const { transitionState, browseBy, setBrowseBy } = this.props;

    let guideStep = transitionState;
    if (guideStep === 9) {
      guideStep = 0;
    } else if (guideStep === 8 || guideStep > 9) {
      guideStep = -1;
    }

    let labelId = 'blank';
    if (transitionState < 7 || transitionState === 9) {
      labelId = 'skip';
    } else if (transitionState > 9) {
      labelId = 'return';
    }

    return (
      <div
        className={classNames('App', `transition-state-${transitionState}`)}
        ref={this.ref}
      >
        <div className="guideWrapper">
          {/**
             * This extra div gets us around the fact that CSS' translate function measures
             * percentages relative to the element being translated; the Guide circle itself
             * can't use percentages for translating to a given position relative to the app.
             */}
          <div className="guideTranslate">
            <Guide step={guideStep} onClick={this.incrementTransitionState} />
          </div>
        </div>
        <ViewOne jumpToAbout={this.jumpToAbout} />
        <section className="browseBy">
          <BrowseBy
            showArrow={(transitionState < 2 || transitionState === 9)}
            labelId={labelId}
            browseBy={browseBy}
            onClick={(transitionState === 8) ? setBrowseBy : this.jumpToView2}
          />
          <GuideTransport
            back={this.decrementTransitionState}
            forward={this.incrementTransitionState}
          />
        </section>
        {/* TODO: Deployment hacks */}
        <div style={{ clear: 'both' }} />
        <ViewTwo {...viewProps} jumpToView1={this.jumpToView1} jumpToView3={this.jumpToView3} />
        <ViewThree {...viewProps} />
        <Footer
          setMainInfoBarPane={this.setMainInfoBarPane}
          mainInfoBarPane={this.state.mainInfoBarPane}
          openDataModal={noop}
        />
      </div>
    );
  }
}

App.propTypes = {
  browseBy: browseByType.isRequired,
  setBrowseBy: PropTypes.func.isRequired,
  transitionState: PropTypes.number.isRequired,
  setTransitionState: PropTypes.func.isRequired,
};

export const AppUnconnected = App;

const ConnectedApp = connect(
  ({
    browseBy,
    transitionState,
  }) => ({
    browseBy,
    transitionState,
  }),
  {
    setBrowseBy: browseByCreators.setBrowseBy,
    setTransitionState: transitionStateCreators.setTransitionState,
  },
)(App);

export default props => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedApp {...props} />
    </Provider>
  </ApolloProvider>
);

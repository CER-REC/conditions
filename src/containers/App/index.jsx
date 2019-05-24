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
const tutorialTiming = 5000;

const transitionStates = {
  view1: 0,
  view2: 7,
  view1Reset: 8,
  view3: 9,
};

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
    this.state = {
      mainInfoBarPane: '',
      tutorialPlaying: false,
    };
    this.ref = React.createRef();
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  incrementTransitionState = (amt) => {
    let currentState = this.props.transitionState;
    if (currentState === transitionStates.view1Reset) { currentState = 0; }
    const newState = Math.min(
      Math.max(transitionStates.view1, currentState + amt),
      transitionStates.view2,
    );
    if (newState !== this.props.transitionState) {
      this.props.setTransitionState(newState);
    }
  };

  handleGuideClick = () => {
    if (this.props.transitionState === transitionStates.view1
      || this.props.transitionState === transitionStates.view1Reset) {
      this.togglePlay(true);
    }
    this.incrementTransitionState(1);
  };

  transportBack = () => {
    this.setState(prevState => ({
      ...prevState,
      tutorialPlaying: false,
    }));
    this.incrementTransitionState(-1);
  };

  transportForward = () => {
    this.setState(prevState => ({
      ...prevState,
      tutorialPlaying: false,
    }));
    this.incrementTransitionState(1);
  };

  playTimer = () => {
    if (this.state.tutorialPlaying
    && (this.props.transitionState < transitionStates.view2
      || this.props.transitionState === transitionStates.view1Reset)
    ) {
      this.incrementTransitionState(1);

      setTimeout(this.playTimer, tutorialTiming);
    }
  };

  // Pass true or false to explicitly set the state
  togglePlay = (state) => {
    this.setState(prevState => ({
      ...prevState,
      tutorialPlaying: (state !== undefined) ? state : !prevState.tutorialPlaying,
    }));

    setTimeout(this.playTimer, tutorialTiming);
  }

  jumpToAbout = () => {
    this.props.setTransitionState(transitionStates.view2);
    this.setMainInfoBarPane('about');

    // This timer needs to be long enough for React to do its thing and for the
    // CSS transitions to finish so the Footer content is there to scroll to.
    setTimeout(() => {
      this.ref.current.querySelector('.Footer').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }

  jumpToView1 = () => this.props.setTransitionState(transitionStates.view1Reset)

  jumpToView2 = (type) => {
    this.props.setTransitionState(transitionStates.view2);
    this.props.setBrowseBy(type);
  }

  jumpToView3 = () => this.props.setTransitionState(transitionStates.view3)

  render() {
    const { transitionState, browseBy, setBrowseBy } = this.props;

    let guideStep = transitionState;
    if (guideStep === transitionStates.view1Reset) {
      guideStep = transitionStates.view1;
    } else if (guideStep === transitionStates.view2 || guideStep > transitionStates.view1Reset) {
      guideStep = -1;
    }

    let labelId = 'blank';
    if (transitionState < (transitionStates.view2 - 1)
    || transitionState === transitionStates.view1Reset) {
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
            <Guide step={guideStep} onClick={this.handleGuideClick} />
          </div>
        </div>
        <ViewOne jumpToAbout={this.jumpToAbout} />
        <section className="appControls">
          <BrowseBy
            showArrow={
              (transitionState === transitionStates.view1
              || transitionState === transitionStates.view1Reset)
            }
            labelId={labelId}
            browseBy={browseBy}
            onClick={(transitionState === transitionStates.view2) ? setBrowseBy : this.jumpToView2}
          />
          <GuideTransport
            playing={this.state.tutorialPlaying}
            back={this.transportBack}
            forward={this.transportForward}
            togglePlay={this.togglePlay}
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

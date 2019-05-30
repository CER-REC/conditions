import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { HttpLink } from 'apollo-link-http';
import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { AppContainer, hot } from 'react-hot-loader';
import i18nMessages from '../../i18n';

import getConditionAncestors from '../../queries/getConditionAncestors';
import getKeywordConditions from '../../queries/getKeywordConditions';

import * as browseByCreators from '../../actions/browseBy';
import * as searchCreators from '../../actions/search';
import * as selectedCreators from '../../actions/selected';
import * as transitionStateCreators from '../../actions/transitionState';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';
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
import ConditionDetails from '../../components/ConditionDetails';
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
  credentials: 'same-origin',
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

  incrementTransitionState = (amt = 1) => {
    let currentState = this.props.transitionState;
    if (currentState === transitionStates.view1Reset) { currentState = 0; }

    const newState = Math.min(
      Math.max(transitionStates.view1, currentState + amt),
      transitionStates.view2,
    );

    if (newState !== this.props.transitionState) {
      this.props.setTransitionState(newState);

      // Fix for users with viewports too short to see the entire vis. losing
      // the Guide. (i.e. they have four toolbars or something)
      if (newState < transitionStates.view2) {
        this.scrollSelectorIntoView('.Guide', 1000);
      }
    }
  };

  handleGuideClick = () => {
    if (this.props.transitionState === transitionStates.view1
      || this.props.transitionState === transitionStates.view1Reset) {
      this.togglePlay(true);
    } else if (this.state.tutorialPlaying) {
      this.togglePlay(false);
    }

    this.incrementTransitionState();
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
    this.incrementTransitionState();
  };

  playTimer = () => {
    if (this.state.tutorialPlaying
    && (this.props.transitionState < transitionStates.view2
      || this.props.transitionState === transitionStates.view1Reset)
    ) {
      this.incrementTransitionState();

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

  scrollSelectorIntoView = (selector, delay) => {
    setTimeout(() => {
      const app = document.documentElement;
      const rect = app.querySelector(selector).getBoundingClientRect();

      if (rect.bottom <= window.innerHeight && rect.top >= 0) { return; }

      // Element.scrollIntoView doesn't work for the Guide; I think because it's inside
      // a transform: translated container?
      app.scrollTo({
        top: (rect.top + app.scrollTop) - (window.innerHeight / 2),
        left: 0,
        behavior: 'smooth',
      });
    }, delay);
  }

  jumpToAbout = () => {
    this.props.setTransitionState(transitionStates.view2);
    this.setMainInfoBarPane('about');

    // This timer needs to be long enough for React to do its thing and for the
    // CSS transitions to finish so the Footer content is there to scroll to.
    this.scrollSelectorIntoView('.Footer', 1000);
  }

  jumpToView1 = () => this.props.setTransitionState(transitionStates.view1Reset)

  jumpToView2 = (type) => {
    this.props.setTransitionState(transitionStates.view2);
    this.props.setBrowseBy(type);
  }

  jumpToView3 = () => this.props.setTransitionState(transitionStates.view3)

  setConditionAncestors = (id) => {
    // TODO: Make a query for this once our server has `conditionById($id)` available
    client.query({
      query: getConditionAncestors,
      variables: { id },
    // eslint-disable-next-line no-unused-vars
    }).then((response) => {
      // TODO: Error checking
      const condition = response.data.getConditionById;

      // TODO: setSelectedCondition once View 2 is wired up for it

      this.props.setSelectedProject(condition.instrument.projectId);

      const randomCompany = Math.floor(
        Math.random() * condition.instrument.project.companyIds.length,
      );
      const company = condition.instrument.project.companyIds[randomCompany];
      this.props.setSelectedCompany(company);
    });
  }

  setSelectedKeyword = (keyword, id) => {
    this.props.setSelectedKeywordId(id);
    this.props.setIncluded([keyword]);
    client.query({
      query: getKeywordConditions,
      variables: { keywords: [keyword] },
    }).then((response) => {
      const { conditionIds } = response.data.findSearchResults;
      if (!conditionIds.length) {
        // TODO: Proper error checking or something
        console.error(`There are no conditions matching "${keyword}"`);
      } else {
        const randomId = conditionIds[Math.floor(Math.random() * conditionIds.length)];
        this.setConditionAncestors(randomId);
      }
    });
  };

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

    const conditionDetailsViewProps = (transitionState === 10)
      ? {
        isExpandable: true,
        toggleExpanded: this.props.expandDetailView,
        expanded: this.props.detailViewExpanded,
      } : {};

    return (
      <div
        className={classNames('App', `transition-state-${transitionState}`)}
        ref={this.ref}
        // For the last tutorial step, the view needs to be interactive but still
        // advance the transition state when something is interacted with.
        // The timeout makes sure React doesn't re-render before the event can
        // propagate to the actual target
        onClickCapture={(transitionState === (transitionStates.view2 - 1))
          ? () => setTimeout(this.incrementTransitionState, 0)
          : null
        }
      >
        <div className="fixedContainer">
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
          <ViewOne jumpToAbout={this.jumpToAbout} setSelectedKeyword={this.setSelectedKeyword} />
          <section className="appControls">
            <BrowseBy
              showArrow={
                (transitionState === transitionStates.view1
                || transitionState === transitionStates.view1Reset)
              }
              labelId={labelId}
              browseBy={browseBy}
              onClick={
                (transitionState === transitionStates.view2)
                  ? setBrowseBy
                  : this.jumpToView2}
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
          <section className="conditions">
            <ConditionDetails
              selectedItem={this.props.selected.condition}
              selectedProject="Selected Project"
              updateSelectedItem={this.props.setSelectedCondition}
              openIntermediatePopup={this.props.openIntermediatePopup}
              openProjectDetails={this.props.openProjectDetails}
              toggleExpanded={noop}
              searchKeywords={{
                include: this.props.included,
                exclude: this.props.excluded,
              }}
              data={conditionData}
              browseBy={this.props.browseBy}
              {...conditionDetailsViewProps}
            />
          </section>
        </div>
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
  included: PropTypes.arrayOf(PropTypes.string).isRequired,
  excluded: PropTypes.arrayOf(PropTypes.string).isRequired,
  detailViewExpanded: PropTypes.bool.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  expandDetailView: PropTypes.func.isRequired,
  openProjectDetails: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedKeywordId: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
};

export const AppUnconnected = App;

const ConnectedApp = hot(module)(connect(
  ({
    selected,
    browseBy,
    transitionState,
    search,
    detailViewExpanded,
  }) => ({
    selected,
    browseBy,
    transitionState,
    included: search.included,
    excluded: search.excluded,
    detailViewExpanded,
  }),
  {
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setSelectedProject: selectedCreators.setSelectedProject,
    setIncluded: searchCreators.setIncluded,
    setSelectedKeywordId: selectedCreators.setSelectedKeywordId,
    setBrowseBy: browseByCreators.setBrowseBy,
    setTransitionState: transitionStateCreators.setTransitionState,
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
  },
)(App));

export default props => (
  <AppContainer>
    <IntlProvider locale="en" messages={i18nMessages.en}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedApp {...props} />
        </Provider>
      </ApolloProvider>
    </IntlProvider>
  </AppContainer>
);

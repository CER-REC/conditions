import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { HttpLink } from 'apollo-link-http';

import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';

import { AppContainer, hot } from 'react-hot-loader';
import getProjectDetails from '../../queries/conditionDetails/getProjectDetails';
import i18nMessages from '../../i18n';
import { lang } from '../../constants';

import { processConditionCounts } from './processQueryData';

import getConditionAncestors from '../../queries/getConditionAncestors';
import getKeywordConditions from '../../queries/getKeywordConditions';
import conditionsPerYearQuery from '../../queries/conditionsPerYear';
import initialConfigurationDataQuery from '../../queries/initialConfigurationData';
import getDateDataUpdated from '../../queries/getDateDataUpdated';

import * as browseByCreators from '../../actions/browseBy';
import * as searchCreators from '../../actions/search';
import * as selectedCreators from '../../actions/selected';
import * as transitionStateCreators from '../../actions/transitionState';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';
import createStore from '../../Store';

import {
  browseByType,
  allConditionsPerYearType,
} from '../../proptypes';

import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo/ViewTwoGraphQL';
import ViewThree from '../ViewThree';
import Footer from '../Footer';
import Guide from '../../components/Guide';
import BrowseBy from '../../components/BrowseBy';
import GuideTransport from '../../components/GuideTransport';
import ConditionDetails from '../../components/ConditionDetails';
import formatConditionDetails from '../../utilities/formatConditionDetails';
import './styles.scss';

import {
  conditionData,
} from '../../mockData';

const store = createStore();
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `/conditions/graphql?lang=${lang}`,
  credentials: 'same-origin',
});
const client = new ApolloClient({ cache, link, fetch });

const noop = () => {};
const tutorialTiming = 5000;

const transitionStates = {
  view1: 0,
  tutorialStart: 1,
  view2: 8,
  view1Reset: 9,
  view3: 10,
};

const viewProps = {
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
      initialGuidePosition: { x: 0, y: 0 },
      finalGuidePosition: { x: 0, y: 0 },
      wheelMoving: false,
    };
    this.ref = React.createRef();
  }

  setWheelMoving = (moving) => { this.setState({ wheelMoving: moving }); };

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  incrementTransitionState = (amt = 1) => {
    let currentState = this.props.transitionState;
    if (currentState === transitionStates.view1Reset) {
      currentState = 0;
    } else if (amt === -1 && currentState === (transitionStates.tutorialStart + 1)) {
      currentState = 1;
    }

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
    // Override to avoid immediately incrementing +1 afterward if we're on the
    // last tutorial step (see the App's onClickCapture attribute)
    clearTimeout(this.transitionTimeout);
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

  syncInitialGuidePosition = (guidePosition) => {
    const view = document.querySelector('.ViewOne');
    const explorer = view.querySelector('.explorer');

    if (!view || !explorer) { return; }

    // Adapted from: https://stackoverflow.com/a/48346417
    const svgRoot = explorer.querySelector('.ConditionExplorer svg');
    const svgGuide = explorer.querySelector('.ConditionExplorer .guide');

    const svgPosition = svgRoot.createSVGPoint();
    const matrix = svgGuide.getCTM();
    svgPosition.x = guidePosition.x;
    svgPosition.y = guidePosition.y;

    const positionInExplorer = svgPosition.matrixTransform(matrix);

    const explorerRect = explorer.getBoundingClientRect();
    const viewRect = view.getBoundingClientRect();

    this.setState({
      initialGuidePosition: {
        x: 100 * (explorerRect.left - viewRect.left + positionInExplorer.x) / viewRect.width,
        y: 100 * (explorerRect.top - viewRect.top + positionInExplorer.y) / viewRect.height,
      },
    });
  };

  syncFinalGuidePosition = () => {
    const view = document.querySelector('.ViewTwo');
    const button = view.querySelector('.KeywordExplorerButton');

    if (!view || !button) { return; }

    // Adapted from: https://stackoverflow.com/a/48346417
    const svgRoot = button.querySelector('svg');
    const svgCircle = button.querySelector('circle');

    const svgPosition = svgRoot.createSVGPoint();
    const matrix = svgCircle.getCTM();

    // TODO: Magic numbers, borrowed from the KeywordExplorer button's SVG
    svgPosition.x = 21;
    svgPosition.y = 14;

    const positionInSvg = svgPosition.matrixTransform(matrix);

    const buttonRect = button.getBoundingClientRect();
    const viewRect = view.getBoundingClientRect();

    this.setState({
      finalGuidePosition: {
        x: 100 * (buttonRect.left - viewRect.left + positionInSvg.x) / viewRect.width,
        y: 100 * (buttonRect.top - viewRect.top + positionInSvg.y) / viewRect.height,
      },
    });
  };

  beginTutorial = (guidePosition) => {
    this.syncInitialGuidePosition(guidePosition);
    this.syncFinalGuidePosition();

    // Apply the "Guide was clicked state" immediately
    this.incrementTransitionState();
    this.togglePlay(true);

    setTimeout(() => {
      this.incrementTransitionState();
    }, 1000);
  };

  getGuideTranslation = () => {
    let guideTranslation;
    if (
      this.props.transitionState === transitionStates.view1
      || this.props.transitionState === transitionStates.view1Reset
      || this.props.transitionState === (transitionStates.tutorialStart)
    ) {
      guideTranslation = {
        transform: `translate(
          ${this.state.initialGuidePosition.x}%,
          ${this.state.initialGuidePosition.y}%
        )`,
      };
    } else if (this.props.transitionState === transitionStates.view2) {
      guideTranslation = {
        transform: `translate(
          ${this.state.finalGuidePosition.x}%,
          ${this.state.finalGuidePosition.y}%
        )`,
      };
    }

    return guideTranslation;
  };

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
    const { transitionState, browseBy, setBrowseBy, selected } = this.props;

    this.processedConditionCounts = this.processedConditionCounts
      || processConditionCounts(this.props.allConditionsPerYear);

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
    } else if (transitionState === transitionStates.view3) {
      labelId = 'return';
    }

    const conditionDetailsViewProps = (transitionState === transitionStates.view3)
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
          ? () => { this.transitionTimeout = setTimeout(this.incrementTransitionState, 0); }
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
            <div
              className="guideTranslate"
              style={this.getGuideTranslation()}
            >
              <Guide step={guideStep} onClick={this.handleGuideClick} />
            </div>
          </div>
          <ViewOne
            jumpToAbout={this.jumpToAbout}
            setSelectedKeyword={this.setSelectedKeyword}
            beginTutorial={this.beginTutorial}
            physicsPaused={(
              transitionState > transitionStates.view1
              && transitionState !== transitionStates.view1Reset
            )}
          />
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
          <ViewTwo
            {...viewProps}
            setWheelMoving={this.setWheelMoving}
            wheelMoving={this.state.wheelMoving}
            conditionsPerYear={this.processedConditionCounts.conditionCounts}
            years={this.processedConditionCounts.years}
            jumpToView1={this.jumpToView1}
            jumpToView3={this.jumpToView3}
          />
          <ViewThree
            {...viewProps}
            conditionsPerYear={this.processedConditionCounts.conditionCounts}
            prefixOrder={this.processedConditionCounts.prefixOrder}
            years={this.processedConditionCounts.years}
          />
          <section className="conditions">
            <Query
              query={getProjectDetails}
              variables={{ projectId: selected.project }}
              skip={!selected.project}
            >
              {(conditionDetailsQProps) => {
                const {
                  data: condDetQData,
                  loading: condDetQLoading,
                  error: condDetQError,
                } = conditionDetailsQProps;
                const loadedCondDetails = !condDetQLoading && !condDetQError && condDetQData
                  && condDetQData.getProjectById;
                const instruments = loadedCondDetails && loadedCondDetails.instruments;
                const formattedInstruments = instruments && !this.state.wheelMoving
                  ? formatConditionDetails(instruments, selected.feature)
                  : [];
                const shortName = formattedInstruments.length > 0
                  && loadedCondDetails.shortName;

                return (
                  <ConditionDetails
                    selectedItem={this.props.selected.condition}
                    selectedProjectId={selected.project}
                    selectedProject={shortName || ''}
                    updateSelectedItem={this.props.setSelectedCondition}
                    openIntermediatePopup={this.props.openIntermediatePopup}
                    openProjectDetails={this.props.openProjectDetails}
                    searchKeywords={{
                      include: this.props.included,
                      exclude: this.props.excluded,
                    }}
                    data={formattedInstruments}
                    browseBy={this.props.browseBy}
                    {...conditionDetailsViewProps}
                  />
                );
              }}
            </Query>
          </section>
          <Query query={getDateDataUpdated}>
            {(dateQProps) => {
              const { loading: dateLoading, error: errorDateQuery, data: dateData } = dateQProps;
              if (dateLoading) return 'Loading Date';
              if (errorDateQuery) return 'Error Occured';
              const dateOfUpdate = new Date(dateData.allConfigurationData.lastUpdated);
              return (
                <div className="DateUpdated">
                  <FormattedMessage id="views.app.dataLastUpdated" tagName="h1" />
                  <h1>{`${`${dateOfUpdate.getFullYear()} -`} ${`${dateOfUpdate.getMonth()} -`} ${dateOfUpdate.getDate()}`}</h1>
                </div>
              );
            }}
          </Query>
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
    project: PropTypes.number,
    subFeature: PropTypes.string.isRequired,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
      instrumentNumber: PropTypes.string,
    }).isRequired,
  }).isRequired,
  allConditionsPerYear: allConditionsPerYearType.isRequired,
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedKeywordId: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
};

export const AppUnconnected = App;

// Allows stories to override the initial state
export const AppStore = store;

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
    <IntlProvider locale={lang} messages={i18nMessages[lang]}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Query query={initialConfigurationDataQuery}>
            {({ data: configData, loading: configLoading }) => (
              <Query query={conditionsPerYearQuery}>
                {({ data: conditionsData, loading: conditionsLoading }) => {
                  // TODO: Error handling for these queries
                  if (
                    conditionsLoading || !conditionsData
                    || configLoading || !configData
                  ) return null;

                  return (
                    <ConnectedApp
                      allConditionsPerYear={conditionsData.conditionsPerYear}
                      configData={configData.allConfigurationData}
                      {...props}
                    />
                  );
                }}
              </Query>
            )}
          </Query>
        </Provider>
      </ApolloProvider>
    </IntlProvider>
  </AppContainer>
);

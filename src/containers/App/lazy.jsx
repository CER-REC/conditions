import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { HttpLink } from 'apollo-link-http';

import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';

import getProjectDetails from '../../queries/conditionDetails/getProjectDetails';
import * as allInstrumentsBy from '../../queries/allInstrumentsBy';
import { lang, regDocURL } from '../../constants';

import * as processQueryData from './processQueryData';

import updateSelection from './updateSelection';
import updateSearch from './updateSearch';

import conditionsPerYearQuery from '../../queries/conditionsPerYear';
import initialConfigurationDataQuery from '../../queries/initialConfigurationData';
import allKeywordsQuery from '../../queries/allKeywords';
import companyNameById from '../../queries/companyNameById';
import { allCompaniesQuery, allRegionsQuery } from '../../queries/wheel';

import * as browseByCreators from '../../actions/browseBy';
import * as searchCreators from '../../actions/search';
import * as selectedCreators from '../../actions/selected';
import * as transitionStateCreators from '../../actions/transitionState';
import * as detailViewExpandedCreators from '../../actions/detailViewExpanded';
import createStore from '../../Store';

import {
  browseByType,
  allConditionsPerYearType,
  allConfigurationDataType,
} from '../../proptypes';

import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo/ViewTwoGraphQL';
import ViewThree from '../ViewThree';
import Footer from '../Footer';
import Guide from '../../components/Guide';
import BrowseBy from '../../components/BrowseBy';
import GuideTransport from '../../components/GuideTransport';
import ConditionDetails from '../../components/ConditionDetails';
import ComposedQuery from '../../components/ComposedQuery';
import formatConditionDetails from '../../utilities/formatConditionDetails';
import handleQueryError from '../../utilities/handleQueryError';
import randomArrayValue from '../../utilities/randomArrayValue';
import ErrorBoundary from '../../components/ErrorBoundary';
import RegDocsPopup from '../../components/RegDocsPopup';
import CompanyPopup from '../../components/CompanyPopup';

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
      initialKeywordPosition: { x: 0, y: 0 },
      finalKeywordPosition: { x: 0, y: 0 },
      isIntermediatePopupOpen: false,
      isCompanyPopupOpen: false,
    };
    this.ref = React.createRef();

    this.lastPlayTimer = 0;

    const updateSelectionWrapped = (from, variables, staticSelection = {}) => {
      updateSelection(
        this.props.selected,
        this.props.setSelectedMultiple,
        client,
        from,
        variables,
        staticSelection,
      );
    };
    this.updateSelection = {
      fromProject: id => updateSelectionWrapped('Project', { id }),
      fromRegion: id => updateSelectionWrapped('Region', { id }),
      fromCompany: id => updateSelectionWrapped('Company', { id }),
      fromInstrument: id => updateSelectionWrapped('Instrument', { id }),
      fromCondition: id => updateSelectionWrapped('Condition', { id }),
      fromSearchedKeyword: (keywordId, conditionId) => updateSelectionWrapped(
        'Condition',
        { id: conditionId },
        { keywordId },
      ),
    };
  }

  componentDidMount() {
    // Dispatch an event to tell the LoadingGuide that we're mounted
    const event = new CustomEvent('LoadingGuide.enabled', { detail: false });
    window.dispatchEvent(event);
  }

  updateSearch = (searchVariables, filterVariables) => updateSearch(
    client,
    // Linter is incorrectly flagging these
    // eslint-disable-next-line react/prop-types
    this.props.setSearchResults,
    // eslint-disable-next-line react/prop-types
    this.props.setFilteredProjects,
    searchVariables,
    filterVariables,
  );

  setWheelMoving = (moving) => { this.setState({ wheelMoving: moving }); };

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  incrementTransitionState = (amt = 1) => {
    let currentState = this.props.transitionState;
    if (currentState === transitionStates.view1Reset) {
      currentState = transitionStates.view1;
    }

    let newState = Math.min(
      Math.max(transitionStates.view1, currentState + amt),
      transitionStates.view2,
    );

    if (newState === transitionStates.tutorialStart && amt < 0) {
      newState = transitionStates.view1;
    }

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

    const elapsed = Date.now() - this.lastPlayTimer;

    // If the transition has just started, go back to the previous step
    const incrementBy = (elapsed < 300)
      ? -2
      : -1;

    this.incrementTransitionState(incrementBy);
  };

  transportForward = () => {
    this.setState(prevState => ({
      ...prevState,
      tutorialPlaying: false,
    }));

    // If we're transitioning, don't skip past the step we're already moving to
    if (Date.now() - this.lastPlayTimer > tutorialTiming) {
      this.incrementTransitionState();
    }
  };

  playTimer = () => {
    if (this.state.tutorialPlaying
    && (this.props.transitionState < transitionStates.view2
      || this.props.transitionState === transitionStates.view1Reset)
    ) {
      this.incrementTransitionState();

      this.lastPlayTimer = Date.now();
      setTimeout(this.playTimer, tutorialTiming);
    }
  };

  // Pass true or false to explicitly set the state
  togglePlay = (state) => {
    this.setState(prevState => ({
      ...prevState,
      tutorialPlaying: (state !== undefined && typeof state !== 'object')
        ? state
        : !prevState.tutorialPlaying,
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
    this.jumpToView2();
    this.setMainInfoBarPane('about');

    // This timer needs to be long enough for React to do its thing and for the
    // CSS transitions to finish so the Footer content is there to scroll to.
    this.scrollSelectorIntoView('.Footer', 1000);
  }

  scrollToMethodology = () => {
    this.setMainInfoBarPane('methodology');
    this.scrollSelectorIntoView('.Footer', 0);
  }

  jumpToView1 = () => {
    this.props.setTransitionState(transitionStates.view1Reset);
    this.props.setBrowseBy('company');
    this.props.setSelectedMultiple({ keywordId: -1 });
  }

  jumpToView2 = (type) => {
    this.props.setTransitionState(transitionStates.view2);

    let modeData;
    let updateFunc;
    if (type === 'location' && !this.props.selected.region) {
      modeData = this.props.allRegions;
      updateFunc = this.updateSelection.fromRegion;
    } else if (!this.props.selected.company) {
      modeData = this.props.allCompanies;
      updateFunc = this.updateSelection.fromCompany;
    }

    if (modeData) {
      const selectedItem = randomArrayValue(modeData);
      updateFunc(selectedItem.id);
    }

    if (type) { this.props.setBrowseBy(type); }
  }

  jumpToView3 = () => this.props.setTransitionState(transitionStates.view3)

  // Adapted from: https://stackoverflow.com/a/48346417
  absolutePositionFromSvg = ({
    xInSvg,
    yInSvg,
    viewSelector,
    svgSelector, // Relative to viewSelector
    elementSelector, // Relative to svgSelector
  }) => {
    const view = document.querySelector(viewSelector);
    if (!view) { return null; }

    const svg = view.querySelector(svgSelector);
    if (!svg) { return null; }

    const svgElement = svg.querySelector(elementSelector);
    if (!svgElement) { return null; }

    const point = svg.createSVGPoint();
    point.x = xInSvg;
    point.y = yInSvg;

    const positionInSvg = point.matrixTransform(svgElement.getCTM());

    const svgRect = svg.getBoundingClientRect();
    const viewRect = view.getBoundingClientRect();

    return {
      x: svgRect.left - viewRect.left + positionInSvg.x,
      y: svgRect.top - viewRect.top + positionInSvg.y,
      viewWidth: viewRect.width,
      viewHeight: viewRect.height,
    };
  };

  syncInitialGuidePosition = (guidePosition) => {
    const position = this.absolutePositionFromSvg({
      xInSvg: guidePosition.x,
      yInSvg: guidePosition.y,
      viewSelector: '.ViewOne',
      svgSelector: '.ConditionExplorer svg',
      elementSelector: '.ConditionExplorer .guide',
    });

    if (position) {
      this.setState({
        initialGuidePosition: {
          x: 100 * position.x / position.viewWidth,
          y: 100 * position.y / position.viewHeight,
        },
      });
    }
  };

  syncFinalGuidePosition = () => {
    const position = this.absolutePositionFromSvg({
      xInSvg: 18,
      yInSvg: 14,
      viewSelector: '.ViewTwo',
      svgSelector: '.KeywordExplorerButton svg',
      elementSelector: 'circle',
    });

    if (position) {
      this.setState({
        finalGuidePosition: {
          x: 100 * position.x / position.viewWidth,
          y: 100 * position.y / position.viewHeight,
        },
      });
    }
  };

  syncInitialKeywordPosition = () => {
    const instance = this.selectedKeywordInstance;

    const position = this.absolutePositionFromSvg({
      xInSvg: instance.body.position.x - (0.89 * instance.keyword.textSize.width),
      yInSvg: instance.body.position.y - 10,
      viewSelector: '.ViewOne',
      svgSelector: '.ConditionExplorer svg',
      elementSelector: `[data-id="${instance.body.id}"]`,
    });

    if (position) {
      this.setState({
        initialKeywordPosition: {
          x: position.x,
          y: position.y,
          angle: instance.body.angle * 180 / Math.PI,
        },
      });
    }
  };

  // TODO: Get the actual destination once we have search highlighting implemented
  syncFinalKeywordPosition = () => {
    this.setState({
      finalKeywordPosition: { x: 800, y: 600 },
    });
  };

  beginTutorial = (guidePosition) => {
    this.syncInitialGuidePosition(guidePosition);
    this.syncFinalGuidePosition();

    this.syncInitialKeywordPosition();
    this.syncFinalKeywordPosition();

    // Apply the "Guide was clicked state" immediately
    this.incrementTransitionState();
    this.togglePlay(true);

    setTimeout(() => {
      this.incrementTransitionState();
    }, 50);
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

  getKeywordTranslation = () => {
    let keywordTranslation;
    if (this.props.transitionState <= transitionStates.tutorialStart) {
      keywordTranslation = {
        transform: `
          translate(
            ${this.state.initialKeywordPosition.x}px,
            ${this.state.initialKeywordPosition.y}px
          )
          rotate(
            ${this.state.initialKeywordPosition.angle}deg
          )
        `,
      };
    } else {
      keywordTranslation = {
        transform: `
          translate(
            ${this.state.finalKeywordPosition.x}px,
            ${this.state.finalKeywordPosition.y}px
          )
          rotate(0deg)
        `,
      };
    }

    return keywordTranslation;
  };

  setSelectedKeyword = (instance) => {
    if (instance) {
      this.selectedKeywordInstance = instance;

      // TODO: We should either make this support the fallback mode (no physics) and
      // finish implementing it, or remove the code for it
      const keywordId = parseInt(instance.body.id, 10);
      const keyword = instance.keyword.value;
      const newIncluded = [keyword];

      this.props.setIncluded(newIncluded);

      this.updateSearch({
        includeKeywords: newIncluded,
        excludeKeywords: this.props.excluded,
        findAny: this.props.findAny,
      }).then((data) => {
        if (!(data.findSearchResults.conditionIds && data.findSearchResults.conditionIds.length)) {
          // TODO: Leaving this here until the ETL search is fixed
          console.error(`There are no conditions matching "${keyword}"`);
        } else {
          const conditionId = randomArrayValue(data.findSearchResults.conditionIds);

          this.updateSelection.fromSearchedKeyword(keywordId, conditionId);
        }
      });
    // Deselect the current keyword
    } else if (this.selectedKeywordInstance) {
      const keyword = this.selectedKeywordInstance.keyword.value;
      const newIncluded = this.props.included.filter(term => term !== keyword);

      this.props.setIncluded(newIncluded);
      this.updateSearch({
        includeKeywords: newIncluded,
        excludeKeywords: this.props.excluded,
        findAny: this.props.findAny,
      });

      this.props.setSelectedMultiple({ keywordId: -1 });
      this.selectedKeywordInstance = null;
    }
  }

  openRegDocPopup = () => {
    this.setState({ isIntermediatePopupOpen: true });
  }

  closeRegDocPopup = () => {
    this.setState({ isIntermediatePopupOpen: false });
  };

  openCompanyPopup = () => {
    this.setState({ isCompanyPopupOpen: true });
  }

  closeCompanyPopup = () => {
    this.setState({ isCompanyPopupOpen: false });
  }

  render() {
    const { transitionState, browseBy, setBrowseBy, selected } = this.props;

    this.processedConditionCounts = this.processedConditionCounts
      || processQueryData.conditionCounts(this.props.allConditionsPerYear);

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
      } : {
        expanded: this.props.detailViewExpanded,
      };

    return (
      <div
        className={classNames('transitionWrapper', `transition-state-${transitionState}`)}
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
            <span
              className="selectedKeywordTranslate"
              style={this.getKeywordTranslation()}
            >
              {(this.selectedKeywordInstance) ? this.selectedKeywordInstance.keyword.value : ''}
            </span>
          </div>
          <ViewOne
            allKeywords={this.props.allKeywords}
            jumpToAbout={this.jumpToAbout}
            setSelectedKeyword={this.setSelectedKeyword}
            beginTutorial={this.beginTutorial}
            physicsPaused={(
              transitionState > transitionStates.view1
              && transitionState !== transitionStates.view1Reset
            )}
            lastUpdated={this.props.allConfigurationData.lastUpdated}
            selectedKeywordId={this.props.selected.keywordId}
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
            allCompanies={this.props.allCompanies}
            allRegions={this.props.allRegions}
            setWheelMoving={this.setWheelMoving}
            wheelMoving={this.state.wheelMoving}
            allConditionsPerYear={this.props.allConditionsPerYear}
            jumpToView1={this.jumpToView1}
            jumpToView3={this.jumpToView3}
            projectYears={{
              start: this.props.allConfigurationData.instrumentYearRange.min,
              end: this.props.allConfigurationData.instrumentYearRange.max,
            }}
            searchResults={this.props.searchResults}
            setSelectedCompany={this.updateSelection.fromCompany}
            setSelectedRegion={this.updateSelection.fromRegion}
            setSelectedProject={this.updateSelection.fromProject}
            filteredProjectLookup={this.props.filteredProjects}
            displayOrder={this.props.allConfigurationData.displayOrder}
            availableCategories={this.props.allConfigurationData.keywordCategories}
            suggestedKeywords={this.props.allKeywords}
            updateSearch={this.updateSearch}
            scrollToMethodology={this.scrollToMethodology}
          />
          <Query
            skip={!this.props.selected || !this.props.selected.company}
            query={companyNameById}
            variables={{ id: this.props.selected.company }}
          >
            {(companyQueryResult) => {
              handleQueryError(companyQueryResult);
              const { data, loading, error } = companyQueryResult;
              const companyName = (!loading && !error && data && data.getCompanyById.name) || '';
              return (
                <ViewThree
                  {...viewProps}
                  displayOrder={this.props.allConfigurationData.displayOrder}
                  allConditionsPerYear={this.props.allConditionsPerYear}
                  years={this.processedConditionCounts.years}
                  companyName={companyName}
                />
              );
            }}
          </Query>
          <section className="conditions">
            <ComposedQuery
              projectDetails={selected.project
                ? { query: getProjectDetails, variables: { projectId: selected.project } }
                : null}
              allInstruments={{
                query: ((browseBy === 'company') ? allInstrumentsBy.project : allInstrumentsBy.region),
                variables: { id: (browseBy === 'company') ? selected.project : selected.region },
              }}
            >
              {({ data, loading, error }) => {
                let shortName = '';
                let instruments = [];
                let instrumentNumber = '';
                let documentId = '';
                let companyArray = [];
                let instrumentIndex = 0;
                let itemIndex = -1;

                if (!loading && !error) {
                  const { projectDetails, allInstruments } = data;
                  if (!allInstruments) { return null; }
                  instruments = formatConditionDetails(
                    allInstruments,
                    selected.feature,
                    this.props.allConfigurationData.displayOrder,
                  );
                  if (instruments.length > 0) {
                    instrumentIndex = instruments
                      .findIndex(instrument => instrument.id === selected.instrument);
                    if (instrumentIndex === -1) {
                      instrumentIndex = 0;
                    } else {
                      ({ documentId } = instruments[instrumentIndex]);
                    }

                    itemIndex = instruments[instrumentIndex].conditions
                      .findIndex(condition => condition.id === selected.condition);
                    ({ instrumentNumber } = instruments[instrumentIndex]);
                  }

                  if (projectDetails) {
                    ({ shortName } = projectDetails);
                    companyArray = projectDetails.companies.map(({ name }) => name);
                  }
                }

                return (
                  <React.Fragment>
                    <ConditionDetails
                      selectedItem={{ instrumentIndex, itemIndex }}
                      selectedProjectId={selected.project}
                      selectedProject={shortName || ''}
                      updateSelectedInstrument={this.updateSelection.fromInstrument}
                      updateSelectedCondition={this.updateSelection.fromCondition}
                      openIntermediatePopup={this.openRegDocPopup}
                      openProjectDetails={this.openCompanyPopup}
                      searchKeywords={{
                        include: this.props.included,
                        exclude: this.props.excluded,
                      }}
                      data={instruments}
                      browseBy={this.props.browseBy}
                      {...conditionDetailsViewProps}
                    />
                    <RegDocsPopup
                      isOpen={this.state.isIntermediatePopupOpen}
                      closeModal={this.closeRegDocPopup}
                      instrument={instrumentNumber}
                      regdocsUrl={`${regDocURL}${documentId}`}
                    />
                    <CompanyPopup
                      projectName={shortName}
                      closeModal={this.closeCompanyPopup}
                      companies={companyArray}
                      isOpen={this.state.isCompanyPopupOpen}
                    />
                  </React.Fragment>
                );
              }}
            </ComposedQuery>
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
  findAny: PropTypes.bool.isRequired,
  detailViewExpanded: PropTypes.bool.isRequired,
  expandDetailView: PropTypes.func.isRequired,
  selected: PropTypes.shape({
    company: PropTypes.number,
    region: PropTypes.number,
    project: PropTypes.number,
    feature: PropTypes.string.isRequired,
    subFeature: PropTypes.string.isRequired,
    instrument: PropTypes.number,
    condition: PropTypes.number,
    keywordId: PropTypes.number.isRequired,
  }).isRequired,
  allConditionsPerYear: allConditionsPerYearType.isRequired,
  allConfigurationData: allConfigurationDataType.isRequired,
  allKeywords: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
    conditionCount: PropTypes.number,
  })).isRequired,
  allCompanies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  allRegions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedMultiple: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
  searchResults: PropTypes.shape({
    companyIdLookup: PropTypes.objectOf(PropTypes.bool),
    conditionIdLookup: PropTypes.objectOf(PropTypes.bool),
    projectIdLookup: PropTypes.objectOf(PropTypes.bool),
    regionIds: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
  filteredProjects: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export const AppUnconnected = App;

// Allows stories to override the initial state
export const AppStore = store;

const ConnectedApp = connect(
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
    findAny: search.findAny,
    searchResults: search.searchResults,
    filteredProjects: search.filteredProjects,
    detailViewExpanded,
  }),
  {
    setIncluded: searchCreators.setIncluded,
    setSelectedMultiple: selectedCreators.setSelectedMultiple,
    setBrowseBy: browseByCreators.setBrowseBy,
    setTransitionState: transitionStateCreators.setTransitionState,
    expandDetailView: detailViewExpandedCreators.toggleDetailView,
    setSearchResults: searchCreators.setSearchResults,
    setFilteredProjects: searchCreators.setFilteredProjects,
  },
)(App);

export default props => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundary>
        <ComposedQuery
          config={{ query: initialConfigurationDataQuery }}
          conditionsPerYear={{ query: conditionsPerYearQuery }}
          allKeywords={{ query: allKeywordsQuery }}
          allCompanies={{ query: allCompaniesQuery }}
          allRegions={{ query: allRegionsQuery }}
        >
          {({ data, loading, errors }) => {
            // TODO: Error handling for these queries
            if (loading || errors) { return null; }

            return (
              <ConnectedApp
                allConditionsPerYear={data.conditionsPerYear}
                allConfigurationData={data.config}
                allKeywords={data.allKeywords}
                allCompanies={data.allCompanies}
                allRegions={data.allRegions}
                {...props}
              />
            );
          }}
        </ComposedQuery>
      </ErrorBoundary>
    </Provider>
  </ApolloProvider>
);

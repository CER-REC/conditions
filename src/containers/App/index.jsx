import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';

import * as browseByCreators from '../../actions/browseBy';
import * as searchCreators from '../../actions/search';
import * as selectedCreators from '../../actions/selected';
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
import './styles.scss';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
  projectsData,
} from '../../mockData';

const store = createStore();
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: graphQLEndPoint,
  credentials: 'same-origin',
});
const client = new ApolloClient({ cache, link, fetch });

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
    this.ref = React.createRef();
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  handleGuideClick = () => {
    const newState = Math.min(Math.max(0, this.props.transitionState + 1), 8);
    if (newState !== this.props.transitionState) {
      this.props.setTransitionState(newState);
    }
  }

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

  setConditionAncestors = (id) => {
    // TODO: Make a query for this once our server has `conditionById($id)` available
    client.query({
      query: gql`
        query{
          getConditionById(id: ${id}){
            instrumentId
            instrument {
              projectId
              project {
                companyIds
              }
            }
            text {
              en
            }
          }
        }
      `,
    // eslint-disable-next-line no-unused-vars
    }).then((response) => {
      // TODO: Error checking

      const condition = response.data.getConditionById[0];

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
      query: gql`
        {
          findSearchResults(
            includeKeywords: ["${keyword}"],
            language: "en" # TODO: Check the app's locale
          ) {
            conditionIds
          }
        }
      `,
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

    let guideState = transitionState;
    if (guideState === 9) {
      guideState = 0;
    } else if (guideState === 8 || guideState > 9) {
      guideState = -1;
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
        <Guide textState={guideState} onClick={this.handleGuideClick} />
        <ViewOne jumpToAbout={this.jumpToAbout} setSelectedKeyword={this.setSelectedKeyword} />
        <section className="browseBy">
          <BrowseBy
            showArrow={(transitionState < 2 || transitionState === 9)}
            labelId={labelId}
            browseBy={browseBy}
            onClick={(transitionState === 8) ? setBrowseBy : this.jumpToView2}
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
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedKeywordId: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
};

export const AppUnconnected = App;

const ConnectedApp = connect(
  ({
    selected,
    browseBy,
    transitionState,
  }) => ({
    selected,
    browseBy,
    transitionState,
  }),
  {
    setSelectedCompany: selectedCreators.setSelectedCompany,
    setSelectedCondition: selectedCreators.setSelectedCondition,
    setSelectedProject: selectedCreators.setSelectedProject,
    setIncluded: searchCreators.setIncluded,
    setSelectedKeywordId: selectedCreators.setSelectedKeywordId,
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

import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { fetch } from 'whatwg-fetch';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
import debounce from 'lodash.debounce';

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

const UP = -1;
const DOWN = 1;
const transitionTargets = {
  0: { [UP]: 0, [DOWN]: 1 }, // View 1
  1: { [UP]: 0, [DOWN]: 2 },
  2: { [UP]: 1, [DOWN]: 3 },
  3: { [UP]: 2, [DOWN]: 4 },
  4: { [UP]: 3, [DOWN]: 5 },
  5: { [UP]: 4, [DOWN]: 6 },
  6: { [UP]: 5, [DOWN]: 7 },
  7: { [UP]: 6, [DOWN]: 8 },
  8: { [UP]: 9, [DOWN]: 8 }, // View 2
  9: { [UP]: 9, [DOWN]: 1 }, // Reset from 2 -> 1
  10: { [UP]: 10, [DOWN]: 10 }, // View 3
};

const transitionIfOver = { App: true, ConditionExplorer: true, svgContainer: true, row: true };
const scrollIfOver = { Footer: true };

const targetIsScrollable = (target) => {
  let checkingTarget = target;

  while (checkingTarget && !transitionIfOver[checkingTarget.classList[0]]) {
    if (
      (checkingTarget.scrollHeight !== checkingTarget.clientHeight)
      || (scrollIfOver[checkingTarget.classList[0]])
    ) {
      // For debugging scroll issues:
      // console.log('=================\noriginal target:');
      // console.dir(target);
      // console.log('scrollable @:');
      // console.dir(checkingTarget\n=================');
      return true;
    }

    checkingTarget = checkingTarget.parentElement;
  }

  return false;
};

class App extends React.PureComponent {
  handleScroll = debounce((deltaY) => {
    /* Browsers + devices provide different values using different units, so
    * we can't use deltaY directly
    */
    const direction = (deltaY > 0 && 1) || (deltaY < 0 && -1);
    if (!direction) return;

    const newState = transitionTargets[this.props.transitionState][direction];

    if (newState !== this.props.transitionState) this.props.setTransitionState(newState);
  }, 1000, { leading: true })

  constructor(props) {
    super(props);
    this.state = { mainInfoBarPane: '' };
    this.ref = React.createRef();
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  debounceScrollEvents = (e) => {
    if (targetIsScrollable(e.target)) { return; }
    e.preventDefault();
    e.stopPropagation();
    this.handleScroll(e.deltaY, e.target);
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

  jumpToView2 = (type) => {
    this.props.setTransitionState(8);
    this.props.setBrowseBy(type);
  }

  jumpToView3 = () => this.props.setTransitionState(10)

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
        onWheel={this.debounceScrollEvents}
        ref={this.ref}
      >
        <Guide textState={guideState} />
        <ViewOne jumpToAbout={this.jumpToAbout} />
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
        <ViewTwo {...viewProps} jumpToView3={this.jumpToView3} />
        <ViewThree {...viewProps} />
        <Footer
          setMainInfoBarPane={this.setMainInfoBarPane}
          mainInfoBarPane={this.state.mainInfoBarPane}
          openDataModal={noop}
          openScreenshotModal={noop}
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

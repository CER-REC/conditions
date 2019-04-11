import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
import debounce from 'lodash.debounce';

import * as browseByCreators from '../../actions/browseBy';
import createStore from '../../Store';

import {
  browseByType,
} from '../../proptypes';

import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import Guide from '../../components/Guide';
import BrowseBy from '../../components/BrowseBy';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
  projectsData,
} from '../../mockData';

import './styles.scss';

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

const transitionIfOver = { App: true, ConditionExplorer: true };
const scrollIfOver = { Footer: true };

const targetIsScrollable = (target) => {
  let checkingTarget = target;

  while (checkingTarget && !transitionIfOver[checkingTarget.classList[0]]) {
    if (
      (checkingTarget.scrollHeight !== checkingTarget.clientHeight)
      || (scrollIfOver[checkingTarget.classList[0]])
    ) {
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

    // const newState = Math.min(Math.max(0, this.props.transitionState + direction), 10);
    const newState = transitionTargets[this.props.transitionState][direction];

    if (newState !== this.props.transitionState) this.props.setTransitionState(newState);
  }, 1000, { leading: true })

  constructor(props) {
    super(props);
    this.state = { mainInfoBarPane: '' };
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  debounceScrollEvents = (e) => {
    if (targetIsScrollable(e.target)) { return; }
    e.preventDefault();
    e.stopPropagation();
    this.handleScroll(e.deltaY, e.target);
  }

  render() {
    // TODO: Move this into the app's actual state
    // Using a prop to work with Storybook knobs
    // eslint-disable-next-line react/prop-types
    const { transitionState, browseBy, setBrowseBy, setTransitionState } = this.props;
    const jumpToView2 = (type) => {
      setTransitionState(8);
      setBrowseBy(type);
    };
    const jumpToView3 = () => setTransitionState(10);

    let guideState = transitionState;
    if (guideState === 9) {
      guideState = 0;
    } else if (guideState === 8 || guideState > 9) {
      guideState = -1;
    }

    return (
      <div className={classNames('App', `transition-state-${transitionState}`)} onWheel={this.debounceScrollEvents}>
        {/* TODO: Figure out proper transition states vs. renders */}
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? <Guide textState={guideState} />
          : null
        }
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? <ViewOne />
          : null
        }
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? (
            <section className="browseBy">
              <BrowseBy
                showArrow={(transitionState < 2 || transitionState === 9)}
                labelId={
                  ((transitionState < 7 || transitionState === 9) && 'skip')
                  || (transitionState > 9 && 'return')
                  || 'blank'
                }
                browseBy={browseBy}
                onClick={(transitionState === 8) ? setBrowseBy : jumpToView2}
              />
            </section>
          )
          : null
        }
        {/* TODO: Deployment hacks */}
        <div style={{ clear: 'both' }} />
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? <ViewTwo {...viewProps} jumpToView3={jumpToView3} />
          : null
        }
        {(transitionState >= 8) ? <ViewThree {...viewProps} /> : null}
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? (
            <Footer
              setMainInfoBarPane={this.setMainInfoBarPane}
              mainInfoBarPane={this.state.mainInfoBarPane}
              openDataModal={noop}
              openScreenshotModal={noop}
            />
          )
          : null
        }
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
  ({ browseBy }) => ({ browseBy }),
  { setBrowseBy: browseByCreators.setBrowseBy },
)(App);

const store = createStore();

export default props => <Provider store={store}><ConnectedApp {...props} /></Provider>;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect, Provider } from 'react-redux';
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

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { mainInfoBarPane: '' };
  }

  setMainInfoBarPane = v => this.setState({ mainInfoBarPane: v });

  render() {
    // TODO: Move this into the app's actual state
    // Using a prop to work with Storybook knobs
    // eslint-disable-next-line react/prop-types
    const { transitionState, browseBy, setBrowseBy } = this.props;

    return (
      <div className={classNames('App', `transition-state-${transitionState}`)}>
        {/* TODO: Figure out proper transition states vs. renders */}
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? <Guide textState={transitionState} />
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
                setBrowseBy={setBrowseBy}
              />
            </section>
          )
          : null
        }
        {/* TODO: Deployment hacks */}
        <div style={{ clear: 'both' }} />
        {/* eslint-disable-next-line no-constant-condition */}
        {(true)
          ? <ViewTwo {...viewProps} />
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
};

export const AppUnconnected = App;

const ConnectedApp = connect(
  ({ browseBy }) => ({ browseBy }),
  { setBrowseBy: browseByCreators.setBrowseBy },
)(App);

const store = createStore();

export default props => <Provider store={store}><ConnectedApp {...props} /></Provider>;

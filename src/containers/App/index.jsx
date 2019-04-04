import React from 'react';
import classNames from 'classnames';

import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import Guide from '../../components/Guide';
import SkipIntro from '../../components/SkipIntro';
import BrowseByBtn from '../../components/BrowseByBtn';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
  projectsData,
} from '../../mockData';

import './styles.scss';

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
    // TODO: Move this into the app's actual state
    // Using a prop to work with Storybook knobs
    // eslint-disable-next-line react/prop-types
    const { transitionState } = this.props;
    return (
      <div className={classNames('App', `transition-state-${transitionState}`)}>
        <Provider store={store}>
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
                <SkipIntro className={(transitionState < 2) ? 'showArrow' : ''} />
                <BrowseByBtn classNames="company" mode="company" onClick={noop} />
                <BrowseByBtn classNames="location" mode="location" onClick={noop} />
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
        </Provider>
      </div>
    );
  }
}

export default App;

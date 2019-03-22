import React from 'react';
import classNames from 'classnames';

import { Provider } from 'react-redux';
import createStore from '../../Store';
import ViewOne from '../ViewOne';
import ViewTwo from '../ViewTwo';
import ViewThree from '../ViewThree';
import Footer from '../Footer';

import Guide from '../../components/Guide';

import {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionData,
} from '../../mockData';

import './styles.scss';

const store = createStore();

const noop = () => {};

const viewProps = {
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
    const { transitionState } = this.props;
    return (
      <div className={classNames('App', `transition-state-${transitionState}`)}>
        <Provider store={store}>
          <Guide />
          {(transitionState < 2)
            ? <ViewOne />
            : null
          }
          {/* TODO: Deployment hacks */}
          <div style={{ clear: 'both' }} />
          {(transitionState >= 2)
            ? <ViewTwo {...viewProps} />
            : null
          }
          {false ? <ViewThree {...viewProps} /> : null}
          {(transitionState >= 7)
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

import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';
import ChartIndicator from '../ChartIndicator';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    instrumentChartData1: PropTypes.instanceOf(Object).isRequired,
    instrumentChartData2: PropTypes.instanceOf(Object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  circleFunction = (circleProp) => {
    const circleRadius = circleProp[0];
    const circleX = circleProp[1];
    const circleY = circleProp[2];
    this.setState({
      indicatorX: circleX,
      indicatorYBottom: circleY - circleRadius,
      indicatorRadius: circleRadius,
      display: true,
    });
  }

  render() {
    const {
      selectedCategory, instrumentChartData1, instrumentChartData2,
    } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }

    return (
      <div className="BubbleChart">
        <svg width={800} height={400}>
          <ChartIndicator x={this.state.indicatorX} yBottom={this.state.indicatorYBottom} yTop={0} radius={this.state.indicatorRadius} display={this.state.display} />
          <InstrumentBubble
            instrumentChartData={instrumentChartData1}
            width={450}
            height={400}
            onClick={this.circleFunction}
          />
          <InstrumentBubble
            instrumentChartData={instrumentChartData2}
            width={1300}
            height={400}
            onClick={this.circleFunction}
          />
        </svg>
      </div>
    );
  }
}

export default BubbleChart;

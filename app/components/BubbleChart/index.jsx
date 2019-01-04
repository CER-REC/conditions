import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    instrumentChartData1: PropTypes.instanceOf(Object).isRequired,
    instrumentChartData2: PropTypes.instanceOf(Object).isRequired,
  }

  render() {
    const { selectedCategory, instrumentChartData1, instrumentChartData2 } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }

    return (
      <div className="BubbleChart">
        <InstrumentBubble instrumentChartData={instrumentChartData1} width={450} height={400} onClick={() => alert('Clicked')} />
        <InstrumentBubble instrumentChartData={instrumentChartData2} width={300} height={400} onClick={() => alert('Clicked')} />
      </div>);
  }
}

export default BubbleChart;

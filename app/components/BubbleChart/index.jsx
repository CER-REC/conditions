import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    bubbleChartData: PropTypes.instanceOf(Object).isRequired,
  }

  render() {
    if (this.props.selectedCategory !== 'instrument') {
      return null;
    }
    return (
      <div className="BubbleChart">
        <InstrumentBubble instrumentChartData={this.props.bubbleChartData} />
      </div>);
  }
}

export default BubbleChart;

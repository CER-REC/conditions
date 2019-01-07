import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from './InstrumentBubble/index';

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
  }

  render() {
    const { selectedCategory } = this.props;
    if (selectedCategory !== 'instrument') {
      return null;
    }
    return (
      <div className="BubbleChart">
        {/* TODO: Add prop for instrument bubble - Will be added in a seperate PR */}
        <InstrumentBubble />
      </div>
    );
  }
}

export default BubbleChart;

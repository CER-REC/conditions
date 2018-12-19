import React from 'react';
import PropTypes from 'prop-types';
import InstrumentBubble from '../BubbleChart/InstrumentBubble/index'

// Placeholder (will be moved to props completely afterwards)
const bubbleChartData = {
  name: 'data',
  children: [{
    parentName: 'GAS',
    children: [
      {
        name: 'XG',
        children: [],
      }, {
        name: 'GC',
        children: [],
        value: 50,
      },
      {
        name: 'GPSO',
        children: [],
        value: 25,
      },
      {
        name: 'SG',
        children: [],
        value: 40,
      },
      {
        name: 'GPLO',
        children: [],
        value: 50,
      }],
  },
  {
    parentName: 'POWER',
    children: [
      {
        name: 'EC',
        children: [],
        value: 50,
      },
      {
        name: 'EPE',
        children: [],
        value: 25,
      },
    ]
},
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 25,
    },
    {
      name: 'SO',
      children: [],
      value: 50,
    }, {
      name: 'OC',
      children: [],
      value: 75,
    }, {
      name: 'OPL',
      children: [],
      value: 25,
    }, {
      name: 'OPLO',
      children: [],
      value: 25,
    }, {
      name: 'OPSO',
      children: [],
      value: 25,
    }],
  }],
};

class BubbleChart extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
  }

  render() {
    if (this.props.selectedCategory !== 'instrument') {
      return null;
    }
    return (
      <div className="bubbleChart">
        <InstrumentBubble bubbleChartData={bubbleChartData} />
      </div>);
  }
}

export default BubbleChart;

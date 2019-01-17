import React from 'react';
import * as d3 from 'd3';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import InstrumentBubble from '.';
import ReadMe from './README.md';

const d3HierarchyCalculation = (instrumentChartData, width, height) => {
  // d3 pack generates a function to
  // fit data into tightly packed circles.
  const pack = d3
    .pack()
    .size([width, height])
    .padding(node => (node.depth === 0 ? 0 : 5))
    .radius((node) => {
      // Calculation for rendering larger circle based on text length
      const characterWidth = 8;
      const textLength = node.data.name.length * characterWidth;
      const textHeight = 15;
      const textLengthExceeds = node.value * 2 <= textLength;
      if (textLengthExceeds) {
        return node.value + textLength; // buffer
      }
      if (node.value < textHeight) {
        return node.value + textHeight;
      }
      return node.value;
    });
  // creates the root node using
  // d3 hierarchy similar to a tree layout
  const root = d3
    .hierarchy(instrumentChartData)
    .sum(totalData => totalData.value)
    .sort((a, b) => b.value - a.value);

  const descendants = pack(root).descendants();
  return descendants;
};
const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'anyCommodityTypes',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'misc',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'misc',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'routing',
      },
    ],
  },
  {
    parentName: 'notSpecified',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'misc',
      },
    ],
  }],
};

storiesForComponent('Components|BubbleChart/InstrumentBubble', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <svg width={300} height={400}>
      <InstrumentBubble
        width={300}
        height={400}
        onClick={() => alert('you clicked')}
        keyPress={() => alert('you pressed a key')}
        d3HierarchyCalculation={d3HierarchyCalculation(
          instrumentChartData2,
          300,
          400,
        )}
      />
    </svg>
  ));

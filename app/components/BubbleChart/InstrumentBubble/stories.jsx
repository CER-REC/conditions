import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import InstrumentBubble from '.';
import ReadMe from './README.md';
import d3HierarchyCalculation from '../../../utilities/d3HierarchyCalculation';

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

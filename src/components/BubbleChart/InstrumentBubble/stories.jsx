import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import InstrumentBubble from '.';
import ReadMe from './README.md';
import d3HierarchyCalculation from '../d3HierarchyCalculation';

import instrumentChartData from '../temporaryData';

storiesForComponent('Components|BubbleChart/InstrumentBubble', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <svg width={850} height={400}>
      <InstrumentBubble
        onClick={() => alert('you clicked')}
        keyPress={() => alert('you pressed a key')}
        d3Calculation={d3HierarchyCalculation(
          instrumentChartData,
          850,
          400,
        )}
      />
    </svg>
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BubbleChart from '.';
import ReadMe from './README.md';

import { conditionCountsByCommodity } from '../../mockData';

storiesForComponent('Components|BubbleChart', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <BubbleChart
      selectedCategory="instrument"
      data={conditionCountsByCommodity.counts}
    />
  ));

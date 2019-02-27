import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BubbleChart from '.';
import ReadMe from './README.md';

import { conditionCountsByCommodity } from '../../mockData';

storiesForComponent('Components|BubbleChart', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setIndicator'] }))
  .add('default', () => (
    <BubbleChart
      data={conditionCountsByCommodity.counts}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: { indicator: '' },
      actions: { setIndicator: () => indicator => ({ indicator }) },
    },
  });

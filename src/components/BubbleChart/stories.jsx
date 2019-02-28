import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BubbleChart from '.';
import ReadMe from './README.md';

import { conditionCountsByCommodity } from '../../mockData';

const defaultTargets = [
  'ALL',
  'ROUTING',
  'CONSTRUCTION',
  'OPENING',
  'MISC',
];

storiesForComponent('Components|BubbleChart', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setIndicator'] }))
  .addDecorator(withKnobs)
  .add('default', () => (
    <BubbleChart
      data={conditionCountsByCommodity.counts}
      type={select('Scroll Target', defaultTargets, '')}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: { indicator: '' },
      actions: { setIndicator: () => indicator => ({ indicator }) },
    },
  });

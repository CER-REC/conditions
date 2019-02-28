import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import TrendButton from '.';
import ReadMe from './README.md';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('Default StreamGraph Button', () => (
    <TrendButton
      {...getInteractionProps()}
      feature="theme"
      subFeature=""
      projectData={conditionCountsByYear.counts}
      instrumentData={conditionCountsByCommodity.counts}
    />
  ))
  .add('Instrument Bubble Button', () => (
    <TrendButton
      {...getInteractionProps()}
      feature="instrument"
      subFeature=""
      projectData={conditionCountsByYear.counts}
      instrumentData={conditionCountsByCommodity.counts}
    />
  ));

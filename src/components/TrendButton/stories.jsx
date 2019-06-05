import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import TrendButton from '.';
import ReadMe from './README.md';
import { conditionCountsByYear } from '../../mockData';

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('Default StreamGraph Button', () => (
    <TrendButton
      {...getInteractionProps()}
      feature="theme"
      subFeature=""
      years={[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]}
      countsData={conditionCountsByYear.counts}
    />
  ));

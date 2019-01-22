import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureFlag from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 1,
  max: 20,
  step: 1,
};

fixInfo(FeatureFlag);

storiesForComponent('Components|FeatureFlag', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('With color', () => (
    <FeatureFlag
      color="pink"
      count={number('Amount of conditions', 1, options)}
      chartType="theme"
      name="damagePrevention"
    />
  ))
  .add('Without color', () => (
    <FeatureFlag
      color="#a1a8a7"
      count={number('Amount of conditions', 1, options)}
      chartType="theme"
      name="damagePrevention"
    />
  ));

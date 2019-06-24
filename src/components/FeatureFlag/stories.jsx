import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureFlag from '.';
import ReadMe from './README.md';

import { features } from '../../constants';

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
  .add('default', () => (
    <FeatureFlag
      count={number('Amount of conditions', 1, options)}
      chartType="theme"
      color={features.theme.DAMAGE_PREVENTION}
      name="DAMAGE_PREVENTION"
    />
  ))
  .add('without tip', () => (
    <FeatureFlag
      count={10}
      chartType="theme"
      color={features.theme.FINANCIAL}
      name="FINANCIAL"
    />
  ))
  .add('with tip', () => (
    <FeatureFlag
      count={20}
      chartType="theme"
      color={features.theme.SECURITY}
      name="SECURITY"
    />
  ));

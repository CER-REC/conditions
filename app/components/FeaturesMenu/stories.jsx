import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeaturesMenu from '.';
import ReadMe from './README.md';

const features = ['theme', 'instrument', 'phase', 'type', 'status', 'filing'];
const featuresOptions = features.reduce((hashAggregate, feature) => ({
  ...hashAggregate,
  [feature]: feature,
}), {});

storiesForComponent('Components|FeaturesMenu', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <FeaturesMenu
      features={features}
      onChange={feature => alert(feature)}
    />
  ))
  .add('selected', () => (
    <FeaturesMenu
      features={features}
      onChange={feature => alert(feature)}
      selected={select('Selected', featuresOptions, 'phase')}
    />
  ))
  .add('drop down', () => (
    <FeaturesMenu
      features={features}
      onChange={feature => alert(feature)}
      dropDown={boolean('Drop Down Mode', true)}
    />
  ));

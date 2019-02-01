import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

const targets = [
  'security',
  'managementSystem',
  'financial',
];

fixInfo(FeatureTypesDescription);

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <FeatureTypesDescription
      scrollTarget={select('Scroll Target', targets, 'security')}
    />
  ))
  .add('instrument types', () => (
    <FeatureTypesDescription feature="instrument" />
  ));

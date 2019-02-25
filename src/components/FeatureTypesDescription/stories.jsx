import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

const defaultTargets = [
  'SECURITY',
  'MANAGEMENT_SYSTEM',
  'FINANCIAL',
];

const instrumentTargets = [
  'ROUTING',
  'CONSTRUCTION',
];

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <FeatureTypesDescription
      feature="theme"
      scrollTarget={select('Scroll Target', defaultTargets, 'SECURITY')}
    />
  ))
  .add('instrument types', () => (
    <FeatureTypesDescription
      feature="instrument"
      scrollTarget={select('Scroll Target', instrumentTargets, 'ROUTING')}
    />
  ));

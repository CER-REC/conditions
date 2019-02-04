import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

const defaultProps = {
  feature: 'theme',
  types: ['security', 'managementSystem', 'financial'],
};

const instrumentProps = {
  feature: 'instrument.category',
  types: ['routing', 'construction'],
  colorCodes: {
    OPL: 'routing',
    GPL: 'routing',
    GC: 'construction',
    OC: 'construction',
  },
};

const defaultTargets = [
  'security',
  'managementSystem',
  'financial',
];

const instrumentTargets = [
  'routing',
  'construction',
];

fixInfo(FeatureTypesDescription);

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <FeatureTypesDescription
      {...defaultProps}
      scrollTarget={select('Scroll Target', defaultTargets, 'security')}
    />
  ))
  .add('instrument types', () => (
    <FeatureTypesDescription
      {...instrumentProps}
      scrollTarget={select('Scroll Target', instrumentTargets, 'routing')}
    />
  ));

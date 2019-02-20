import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

const defaultProps = {
  feature: 'theme',
  types: ['SECURITY', 'MANAGEMENT_SYSTEM', 'FINANCIAL'],
};

const instrumentProps = {
  feature: 'instrument.category',
  types: ['ROUTING', 'CONSTRUCTION'],
  colorCodes: {
    OPL: 'ROUTING',
    GPL: 'ROUTING',
    GC: 'CONSTRUCTION',
    OC: 'CONSTRUCTION',
  },
};

const defaultTargets = [
  'SECURITY',
  'MANAGEMENT_SYSTEM',
  'FINANCIAL',
];

const instrumentTargets = [
  'ROUTING',
  'CONSTRUCTION',
];

fixInfo(FeatureTypesDescription);

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <FeatureTypesDescription
      {...defaultProps}
      scrollTarget={select('Scroll Target', defaultTargets, 'SECURITY')}
    />
  ))
  .add('instrument types', () => (
    <FeatureTypesDescription
      {...instrumentProps}
      scrollTarget={select('Scroll Target', instrumentTargets, 'ROUTING')}
    />
  ));

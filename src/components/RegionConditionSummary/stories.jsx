import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditionSummary from '.';

const themeData = [
  { feature: 'theme', description: 'STANDARD_CONDITION', value: 50 },
  { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', value: 20 },
  { feature: 'theme', description: 'ENVIRONMENTAL_PROTECTION', value: 43 },
  { feature: 'theme', description: 'ADMINISTRATIVE', value: 15 },
  { feature: 'theme', description: 'SUNSET_CLAUSE', value: 5 },
  { feature: 'theme', description: 'ENFORCEMENT', value: 15 },
  { feature: 'theme', description: 'EMERGENCY_MANAGEMENT', value: 3 },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', value: 15 },
  { feature: 'theme', description: 'SAFETY_MANAGEMENT', value: 3 },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', value: 3 },
  { feature: 'theme', description: 'FINANCIAL', value: 3 },
  { feature: 'theme', description: 'SECURITY', value: 3 },
  { feature: 'theme', description: 'MANAGEMENT_SYSTEM', value: 3 },
  { feature: 'theme', description: 'NO_THEME_INDICATED', value: 4 },
];

const typeData = [
  { feature: 'type', description: 'STANDARD', value: 50 },
  { feature: 'type', description: 'NON_STANDARD', value: 100 },
];

storiesForComponent('Components|RegionConditionSummary', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .addDecorator(withStyles(`
    .RegionConditionSummary { width: 300px; height: 124px; }
  `))
  .add('with theme data', () => (
    <RegionConditionSummary
      featureData={themeData}
    />
  ))
  .add('with type data', () => (
    <RegionConditionSummary
      featureData={typeData}
    />
  ))
  .add('with no data', () => (
    <RegionConditionSummary
      featureData={[]}
    />
  ));

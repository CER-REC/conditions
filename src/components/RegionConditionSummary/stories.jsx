import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditionSummary from '.';

const themeData = [
  { feature: 'theme', description: 'STANDARD_CONDITION', count: 50 },
  { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', count: 20 },
  { feature: 'theme', description: 'ENVIRONMENTAL_PROTECTION', count: 43 },
  { feature: 'theme', description: 'ADMINISTRATIVE', count: 15 },
  { feature: 'theme', description: 'SUNSET_CLAUSE', count: 5 },
  { feature: 'theme', description: 'ENFORCEMENT', count: 15 },
  { feature: 'theme', description: 'EMERGENCY_MANAGEMENT', count: 3 },
  { feature: 'theme', description: 'SOCIO_ECONOMIC', count: 15 },
  { feature: 'theme', description: 'SAFETY_MANAGEMENT', count: 3 },
  { feature: 'theme', description: 'DAMAGE_PREVENTION', count: 3 },
  { feature: 'theme', description: 'FINANCIAL', count: 3 },
  { feature: 'theme', description: 'SECURITY', count: 3 },
  { feature: 'theme', description: 'MANAGEMENT_SYSTEM', count: 3 },
  { feature: 'theme', description: 'NO_THEME_INDICATED', count: 4 },
];

const typeData = [
  { feature: 'type', description: 'STANDARD', count: 50 },
  { feature: 'type', description: 'NON_STANDARD', count: 100 },
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

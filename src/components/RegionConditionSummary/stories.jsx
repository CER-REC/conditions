import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditionSummary from '.';

const themeData = [
  { color: 'pink', description: 'STANDARD_CONDITION', count: 50 },
  { color: 'red', description: 'INTEGRITY_MANAGEMENT', count: 20 },
  { color: 'green', description: 'ENVIROMENTAL_PROTECT', count: 43 },
  { color: 'blue', description: 'ADMINISTRATIVE', count: 15 },
  { color: 'purple', description: 'SUNSET_CLAUSE', count: 5 },
  { color: 'yellow', description: 'ENFORCEMENT', count: 15 },
  { color: 'orange', description: 'EMERGENCY_MANAGEMENT', count: 3 },
  { color: 'navy', description: 'SOCIO_ECONOMIC', count: 15 },
  { color: 'plum', description: 'SAFETY_MANAGEMENT', count: 3 },
  { color: 'olive', description: 'DAMAGE_PREVENTION', count: 3 },
  { color: 'coral', description: 'FINANCIAL', count: 3 },
  { color: 'cadetBlue', description: 'SECURITY', count: 3 },
  { color: 'darkGreen', description: 'MANAGEMENT_SYSTEM', count: 3 },
  { color: 'black', description: 'NO_THEME_INDICATED', count: 4 },
  { color: '#e4e4e4', description: 'all', count: 0 },
];

const typeData = [
  { color: 'pink', description: 'standardCondition', count: 50 },
  { color: 'purple', description: 'nonStandardCondition', count: 100 },
];

storiesForComponent('Components|RegionConditionSummary', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
  }))
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

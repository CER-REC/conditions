import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionConditionSummary from '.';

const themeData = [
  { color: 'pink', description: 'standardCondition', count: 50 },
  { color: 'red', description: 'integrityManagement', count: 20 },
  { color: 'green', description: 'enviromentalProtect', count: 43 },
  { color: 'blue', description: 'administrative', count: 15 },
  { color: 'purple', description: 'sunsetClause', count: 5 },
  { color: 'yellow', description: 'enforcement', count: 15 },
  { color: 'orange', description: 'emergencyManagement', count: 3 },
  { color: 'navy', description: 'socioEconomic', count: 15 },
  { color: 'plum', description: 'safetyManagement', count: 3 },
  { color: 'olive', description: 'damagePrevention', count: 3 },
  { color: 'coral', description: 'financial', count: 3 },
  { color: 'cadetBlue', description: 'security', count: 3 },
  { color: 'darkGreen', description: 'managementSystem', count: 3 },
  { color: 'black', description: 'noThemeIndicated', count: 4 },
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

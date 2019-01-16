import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesLegend from '.';
import ReadMe from './README.md';

const legendItems = [
  { color: 'pink', description: 'test 1', disabled: true },
  { color: 'red', description: 'test 2', disabled: false },
  { color: 'green', description: 'test 3', disabled: false },
  { color: 'blue', description: 'test 4', disabled: false },
  { color: 'purple', description: 'test 5', disabled: false },
];

storiesForComponent('Components|FeaturesLegend', module, ReadMe)
  .add('default', () => (
    <FeaturesLegend legendItems={legendItems} />
  ));

import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewThreeRaw } from '.';
import { conditionCountsByYear } from '../../mockData';

const noop = () => {};
const props = {
  conditionCountsByYear,
  selected: {
    feature: 'theme',
  },
  setSelectedFeature: noop,
};

storiesForView('Containers|ViewThree', module, ReadMe)
  .add('default', () => <ViewThreeRaw {...props} />)
  .add('layout only', () => <ViewThreeRaw {...props} layoutOnly />);

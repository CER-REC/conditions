import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewThree from '.';
import { conditionCountsByYear } from '../../mockData';

const props = {
  conditionCountsByYear,
};

storiesForView('Containers|ViewThree', module, ReadMe)
  .add('default', () => <ViewThree {...props} />)
  .add('layout only', () => <ViewThree {...props} layoutOnly />);

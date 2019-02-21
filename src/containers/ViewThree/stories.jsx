import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewThree from '.';

storiesForView('Containers|ViewThree', module, ReadMe)
  .add('default', () => <ViewThree />)
  .add('layout only', () => <ViewThree layoutOnly />);

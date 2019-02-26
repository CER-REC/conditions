import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewTwo from '.';

storiesForView('Containers|ViewTwo', module, ReadMe)
  .add('default', () => <ViewTwo />)
  .add('layout only', () => <ViewTwo layoutOnly />);

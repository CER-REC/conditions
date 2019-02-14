import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewOne from '.';

storiesForView('Containers|ViewOne', module, ReadMe)
  .add('default', () => <ViewOne />)
  .add('layout only', () => <ViewOne layoutOnly />);

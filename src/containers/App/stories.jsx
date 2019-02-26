import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App from '.';

storiesForView('Containers|App', module, ReadMe)
  .add('default', () => <App />);

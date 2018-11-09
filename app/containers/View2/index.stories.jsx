import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';

storiesForView('Views|View 2', module, ReadMe)
  .add('TODO', () => (
    <h1>TODO: View2</h1>
  ));

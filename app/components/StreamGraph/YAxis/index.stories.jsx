import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import YAxis from './';
import ReadMe from './README.md';

storiesForComponent('Components|XAxis', module, ReadMe)
  .add('default', () => (
    <YAxis />
  ));

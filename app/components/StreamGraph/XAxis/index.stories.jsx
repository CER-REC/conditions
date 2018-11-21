import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import XAxis from './';
import ReadMe from './README.md';

storiesForComponent('Components|XAxis', module, ReadMe)
  .add('default', () => (
    <XAxis />
  ));

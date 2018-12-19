import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Control from './';
import ReadMe from './README.md';

storiesForComponent('Components|StreamGraph/Control', module, ReadMe)
  .add('with default values', () => (
    <svg><Control /></svg>
  ));

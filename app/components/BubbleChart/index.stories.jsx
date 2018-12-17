
import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BubbleChart from './';
import ReadMe from './README.md';

storiesForComponent('Components|BubbleChart', module, ReadMe)
  .add('Gas Bubble', () => (
    <BubbleChart selectedCategory="instrument" width={500} height={500} />
  ));


import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BubbleChart from './';
import ReadMe from './README.md';

const energyBubbleData = [
  {
    name: 'gas',
    energyNum: 100,
  },
  {
    name: 'power',
    energyNum: 30,
  },
  {
    name: 'oil',
    energyNum: 100,
  },
  {
    name: 'not specified',
    energyNum: 50,
  },
  {
    name: 'any commodity types',
    energyNum: 150,
  },
];

storiesForComponent('Components|BubbleChart', module, ReadMe)
  .add('default', () => (
    <BubbleChart selectedCategory="instrument" width={1000} height={1500} energyBubbleData={energyBubbleData} />
  ));

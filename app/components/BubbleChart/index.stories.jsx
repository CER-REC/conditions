
import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BubbleChart from './';
import ReadMe from './README.md';
const bubbleChartData = {
  name: 'data',
  children: [{
    parentName: 'GAS',
    children: [
      {
        name: 'XG',
        children: [],
      }, {
        name: 'GC',
        children: [],
        value: 50,
      },
      {
        name: 'GPSO',
        children: [],
        value: 25,
      },
      {
        name: 'SG',
        children: [],
        value: 40,
      },
      {
        name: 'GPLO',
        children: [],
        value: 50,
      }],
  },
  {
    parentName: 'POWER',
    children: [
      {
        name: 'EC',
        children: [],
        value: 50,
      },
      {
        name: 'EPE',
        children: [],
        value: 25,
      },
    ]
},
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 25,
    },
    {
      name: 'SO',
      children: [],
      value: 50,
    }, {
      name: 'OC',
      children: [],
      value: 75,
    }, {
      name: 'OPL',
      children: [],
      value: 25,
    }, {
      name: 'OPLO',
      children: [],
      value: 25,
    }, {
      name: 'OPSO',
      children: [],
      value: 25,
    }],
  }],
};
// < To Do: Divide the two components in different stories once logic is set up />
storiesForComponent('Components|BubbleChart', module, ReadMe)
  .add('Gas Bubble', () => (
    <BubbleChart selectedCategory="instrument" bubbleChartData={bubbleChartData} />
  ));

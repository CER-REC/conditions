import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BubbleChart from '.';
import ReadMe from './README.md';

const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'ANY_COMMODITY_TYPES',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'MISC',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'MISC',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'ROUTING',
      },
    ],
  },
  {
    parentName: 'NOT_SPECIFIED',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'CONSTRUCTION',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'MISC',
      },
    ],
  }],
};

const instrumentChartData1 = {
  name: 'data',
  children: [{
    parentName: 'GAS',
    children: [
      {
        name: 'XG',
        children: [],
        value: 40,
        category: 'CONSTRUCTION',
      }, {
        name: 'GC',
        children: [],
        value: 30,
        category: 'CONSTRUCTION',
      },
      {
        name: 'GPSO',
        children: [],
        value: 10,
        category: 'OPENING',
      },
      {
        name: 'SG',
        children: [],
        value: 20,
        category: 'SAFETY',
      },
      {
        name: 'GPLO',
        children: [],
        value: 5,
        category: 'OPENING',
      },
      {
        name: 'TG',
        children: [],
        value: 10,
        category: 'TARIFFS',
      },
    ],
  },
  {
    parentName: 'POWER',
    children: [
      {
        name: 'EC',
        children: [],
        value: 10,
        category: 'CONSTRUCTION',
      },
      {
        name: 'EPE',
        children: [],
        value: 15,
        category: 'CONSTRUCTION',
      },
    ],
  },
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 40,
      category: 'CONSTRUCTION',
    },
    {
      name: 'SO',
      children: [],
      value: 30,
      category: 'SAFETY',
    }, {
      name: 'OC',
      children: [],
      value: 40,
      category: 'CONSTRUCTION',
    }, {
      name: 'OPLO',
      children: [],
      value: 10,
      category: 'OPENING',
    }, {
      name: 'OPSO',
      children: [],
      value: 10,
      category: 'OPENING',
    }],
  }],
};
storiesForComponent('Components|BubbleChart', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <BubbleChart
      selectedCategory="instrument"
      instrumentChartData1={instrumentChartData1}
      instrumentChartData2={instrumentChartData2}
    />
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import BubbleChart from '.';
import ReadMe from './README.md';

const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'ANY COMMODITY TYPES',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'misc',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'misc',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'routing',
      },
    ],
  },
  {
    parentName: 'NOT SPECIFIED',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'misc',
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
        category: 'construction',
      }, {
        name: 'GC',
        children: [],
        value: 30,
        category: 'construction',
      },
      {
        name: 'GPSO',
        children: [],
        value: 10,
        category: 'opening',
      },
      {
        name: 'SG',
        children: [],
        value: 20,
        category: 'safety',
      },
      {
        name: 'GPLO',
        children: [],
        value: 5,
        category: 'opening',
      },
      {
        name: 'TG',
        children: [],
        value: 10,
        category: 'tariffs',
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
        category: 'construction',
      },
      {
        name: 'EPE',
        children: [],
        value: 15,
        category: 'construction',
      },
    ],
  },
  {
    parentName: 'OIL',
    children: [{
      name: 'XO',
      children: [],
      value: 40,
      category: 'construction',
    },
    {
      name: 'SO',
      children: [],
      value: 30,
      category: 'safety',
    }, {
      name: 'OC',
      children: [],
      value: 40,
      category: 'construction',
    }, {
      name: 'OPLO',
      children: [],
      value: 10,
      category: 'opening',
    }, {
      name: 'OPSO',
      children: [],
      value: 10,
      category: 'opening',
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
      onClick={() => alert('Clicked')}
    />
  ));

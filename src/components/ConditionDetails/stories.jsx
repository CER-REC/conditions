import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

const items = [
  [
    {
      value: 43,
      fill: 'pink',
      condition: [  {date: 'x'},{ day: 'y'}, {days: 'z'}, {text: 'lorem ipsum'},
      ],
    },
    {
      value: 28,
      fill: 'blue',
      condition: [  {date: 'x'},{ day: 'y'}, {days: 'z'}, {text: 'lorem ipsum'},
      ],
    },
    {
      value: 13,
      fill: 'red',
      condition: [  { date: 'x' }, { day: 'y' }, { days: 'z' }, { text: 'lorem ipsum' },
      ],
    }
  ],
  [
    {
      value: 33,
      fill: 'red',
      condition: [
        { date: 'x' }, { day: 'y' }, { days: 'z' }, { text: 'lorem ipsum' },
      ],
    }
  ],
  [
    {
      value: 66,
      fill: 'orange',
      condition: [
        { date: 'x' },{ day: 'y' }, { days: 'z' }, { text: 'lorem ipsum' },
      ],
    },
  ],
];
const itemsBinned = [
  [
    {
      value: 3,
      fill: 'pink',
      condition: {
        date: 'x', day: 'y', days: 'z', text: 'lorem ipsum',
      },
    },
  ],
  [
    {
      value: 1,
      fill: 'red',
      condition: {
        date: 'x', day: 'y', days: 'z', text: 'lorem ipsum',
      },
    },
  ],
  [
    {
      value: 2,
      fill: 'orange',
      condition: {
        date: 'x', day: 'y', days: 'z', text: 'lorem ipsum',
      },
    },
  ],
];

const searched = [1, 0, 1];

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .add('default', () => (
    <ConditionDetails conditions={itemsBinned} maxWidth={99} maxValue={3} />
  ))
  .add('default and searched', () => (
    <ConditionDetails conditions={itemsBinned} maxWidth={99} maxValue={3} searched={searched} />
  ))
  .add('location weighted', () => (
    <ConditionDetails conditions={items} maxWidth={256} />
  ))
  .add('location weighted and searched', () => (
    <ConditionDetails conditions={items} maxWidth={256} searched={searched} />
  ));

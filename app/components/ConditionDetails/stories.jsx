import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

const items = [
  {
    value: 1,
    fill: ['tomato', 'blue'],
  },
  {
    value: 2,
    fill: ['red', 'green', 'magenta'],
  },
  {
    value: 3,
    fill: ['pink'],
  },
  {
    value: 1,
    fill: ['tomato'],
  },
  {
    value: 2,
    fill: ['red'],
  },
  {
    value: 3,
    fill: ['pink'],
  },
];

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .add('default', () => (
    <ConditionDetails conditions={items} listWidth={256} />
  ));

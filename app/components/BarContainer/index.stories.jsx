import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BarContainer from '.';
import ReadMe from './README.md';

const rectItems = [
  {
    width: 20,
    height: 10,
    x: 0,
    y: 0,
    fill: 'tomato',
  },
  {
    width: 60,
    height: 50,
    x: 0,
    y: 0,
    fill: 'red',
  },
  {
    width: 40,
    height: 20,
    x: 0,
    y: 0,
    fill: 'pink',
  },
];

storiesForComponent('Components|BarContainer', module, ReadMe)

  .add('default', () => (
    <BarContainer title="ConditionTitle" desc="conditionDesc" items={rectItems} defaultHeight="12" />
  ))

  .add('verticle bars', () => (
    <BarContainer
      title="ConditionTitle"
      desc="conditionDesc"
      items={rectItems}
      vert
    />
  ))

  .add('standalone', () => (
    <svg>
      <BarContainer
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
        standalone
      />
    </svg>
  ));

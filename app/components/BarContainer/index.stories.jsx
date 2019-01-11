import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BarContainer from '.';
import ReadMe from './README.md';

const rectItems = [
  {
    value: 12,
    fill: 'tomato',
  },
  {
    value: 66,
    fill: 'red',
  },
  {
    value: 33,
    fill: 'pink',
  },
];

storiesForComponent('Components|BarContainer', module, ReadMe)

  .add('default', () => (
    <BarContainer
      title="ConditionTitle"
      desc="conditionDesc"
      items={rectItems}
      size={12}
    />
  ))

  .add('vertical bars', () => (
    <BarContainer
      size={30}
      title="ConditionTitle"
      desc="conditionDesc"
      items={rectItems}
      vert
    />
  ))

  .add('standalone', () => (
    <svg>
      <BarContainer
        size={12}
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
        standalone
      />
    </svg>
  ))

  .add('scale horizontal and 2x scale', () => (
    <BarContainer
      title="ConditionTitle"
      desc="conditionDesc"
      items={rectItems}
      size={12}
      scale={2}
    />
  ))

  .add('vertical bars with 2x scale', () => (
    <BarContainer
      size={30}
      title="ConditionTitle"
      desc="conditionDesc"
      items={rectItems}
      vert
      scale={2}
    />
  ))

  .add('vertical bars with 2x scale and standalone', () => (
    <svg>
      <BarContainer
        size={30}
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
        vert
        scale={2}
        standalone
      />
    </svg>
  ));


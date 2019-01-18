import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import withStatus from '../../../.storybook/addon-status';
import { storiesForComponent } from '../../../.storybook/utils';
import BarContainer from '.';
import ReadMe from './README.md';

const rectItems = [
  {
    value: 12,
    fill: 'green',
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
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => {
    const vert = boolean('Vertical', false);
    const scale = number('Scale', 1);
    const size = number('Size', 12);
    return (
      <BarContainer
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
        size={size}
        scale={scale}
        vert={vert}
      />
    );
  })
  .add('vertical bars', () => {
    const size = number('Size', 20);
    return (
      <BarContainer
        size={size}
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
        vert
      />
    );
  })
  .add('searched bars', () => {
    const size = number('Size', 15);
    return (
      <BarContainer
        size={size}
        title="ConditionTitle"
        desc="conditionDesc"
        items={rectItems}
      />
    );
  })

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


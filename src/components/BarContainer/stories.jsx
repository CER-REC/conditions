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
  .add('default', () => (
    <BarContainer
      items={rectItems}
      size={number('Size', 12)}
      scale={number('Scale', 1)}
      vert={boolean('Vertical', false)}
    />
  ))
  .add('vertical bars', () => (
    <BarContainer
      size={number('Size', 20)}
      items={rectItems}
      vert
    />
  ))
  .add('searched bars', () => {
    const size = number('Size', 15);
    return (
      <BarContainer
        size={size}
        items={rectItems}
      />
    );
  })

  .add('standalone', () => (
    <svg>
      <BarContainer
        size={12}
        items={rectItems}
        standalone
      />
    </svg>
  ))

  .add('scale horizontal and 2x scale', () => (
    <BarContainer
      items={rectItems}
      size={12}
      scale={2}
    />
  ))

  .add('vertical bars with 2x scale', () => (
    <BarContainer
      size={30}
      items={rectItems}
      vert
      scale={2}
    />
  ))

  .add('vertical bars with 2x scale and standalone', () => (
    <svg>
      <BarContainer
        size={30}
        items={rectItems}
        vert
        scale={2}
        standalone
      />
    </svg>
  ));

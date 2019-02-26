import React from 'react';
import withStatus from '../../../.storybook/addon-status';
import { storiesForComponent } from '../../../.storybook/utils';
import BarContainer from '.';
import ReadMe from './README.md';

const rectItems = [
  { value: 12, fill: 'green' },
  { value: 66, fill: 'red' },
  { value: 33, fill: 'pink' },
];

storiesForComponent('Components|BarContainer', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => <BarContainer items={rectItems} />)
  .add('vertical bars', () => <BarContainer items={rectItems} vertical />)
  .add('standalone', () => (
    <svg>
      <BarContainer
        items={rectItems}
        standalone
      />
    </svg>
  ));

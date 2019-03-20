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
  .add('size as percentage', () => <BarContainer items={rectItems} width="50%" />)
  .add('size as pixels', () => <BarContainer items={rectItems} width={200} height={200} />)
  .add('standalone', () => <svg><BarContainer items={rectItems} standalone /></svg>);

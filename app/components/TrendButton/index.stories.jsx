import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import TrendButton from './';
import ReadMe from './README.md';

const encodingOptions = [
  'theme',
  'instrument',
];

storiesForComponent('TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('for encoding', () => (
    <TrendButton
      encoding={select('Encoding', encodingOptions, encodingOptions[0])}
      onClick={() => console.warn('Clicked')}
    />
  ));

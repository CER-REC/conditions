import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { checkA11y } from '@storybook/addon-a11y';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, select } from '@storybook/addon-knobs';
import TrendButton from './';

const encodingOptions = [
  'theme',
  'instrument',
];


storiesOf('TrendButton', module)
  .addDecorator(withNotes)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('for encoding', () => (
    <TrendButton
      encoding={select('Encoding', encodingOptions, encodingOptions[0])}
      onClick={() => console.warn('Clicked')}
    />
  ), {
    notes: {
      markdown: `
# TrendButton

## Requirements

* Handles click event
* Text reflects selected encoding
* Background should update to be a mini version of the v3 chart that will be displayed
      `,
    },
  });

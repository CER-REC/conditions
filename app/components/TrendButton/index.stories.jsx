import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withDocs } from 'storybook-readme';
import TrendButton from './';
import ReadMe from './README.md';

const encodingOptions = [
  'theme',
  'instrument',
];

storiesOf('TrendButton', module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('for encoding', withDocs(ReadMe, () => (
    <TrendButton
      encoding={select('Encoding', encodingOptions, encodingOptions[0])}
      onClick={() => console.warn('Clicked')}
    />
  )));

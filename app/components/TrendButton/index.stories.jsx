import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import TrendButton from './';
import ReadMe from './README.md';

const featureOptions = [
  'Theme',
  'Instrument',
  'Phase',
  'Type',
  'Status',
  'Filing',
];

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default button', () => (
    <TrendButton
      selectedFeature={featureOptions[0]}
      onChange={() => alert('Clicked')}
      streamGraphData="false"
    />
  ));

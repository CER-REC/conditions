import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import TrendButton from '.';
import ReadMe from './README.md';

const featureOptions = [
  'Theme',
  'Phase',
  'Instrument',
  'Type',
  'Status',
  'Filing',
];

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('Static image', () => (
    <TrendButton
      selectedFeature={select('selectedFeature', featureOptions, featureOptions[0])}
      onChange={() => alert('Clicked')}
    />
  ))
  .add('Svg background placeholder', () => (
    <TrendButton
      selectedFeature={select('selectedFeature', featureOptions, featureOptions[2])}
      onChange={() => alert('Clicked')}
      streamGraphData={[1, 2, 3]}
    />
  ));

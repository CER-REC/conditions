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
  .add('Theme button with static image', () => (
    <TrendButton
      selectedFeature={featureOptions[0]}
      onChange={() => alert('Clicked')}
      streamGraphData="false"
    />
  ));
storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('Instrument button with static image', () => (
    <TrendButton
      selectedFeature={featureOptions[1]}
      onChange={() => alert('Clicked')}
      streamGraphData="false"
    />
  ));
storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('Phase button with static image', () => (
    <TrendButton
      selectedFeature={featureOptions[2]}
      onChange={() => alert('Clicked')}
      streamGraphData="false"
    />
  ));

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withKnobs)
  .add('Phase button with View3 svg background placeholder', () => (
    <TrendButton
      selectedFeature={featureOptions[2]}
      onChange={() => alert('Clicked')}
      streamGraphData="true"
    />
  ));

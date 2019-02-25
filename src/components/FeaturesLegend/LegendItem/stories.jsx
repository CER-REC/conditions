import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from '.';
import ReadMe from './README.md';

storiesForComponent('Components|FeaturesLegend/LegendItem', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <LegendItem
      color="pink"
      text="SECURITY"
      disabled={boolean('Empty', false)}
      selectedFeature="theme"
    />
  ));

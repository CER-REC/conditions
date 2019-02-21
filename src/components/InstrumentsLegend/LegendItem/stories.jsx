import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from '.';
import ReadMe from './README.md';

storiesForComponent('Components|InstrumentsLegend/LegendItem', module, ReadMe)
  .add('basic usage', () => (
    <LegendItem
      title="ROUTING"
      indicators={[true, true, false, true]}
      color="green"
    />
  ))
  .add('all', () => (
    <LegendItem
      title="MISC"
      indicators={[]}
      color=""
      all
    />
  ));

import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import LegendItem from '.';
import ReadMe from './README.md';

storiesForComponent('Components|InstrumentsLegend/LegendItem', module, ReadMe)
  .add('basic usage', () => (
    <LegendItem />
  ));

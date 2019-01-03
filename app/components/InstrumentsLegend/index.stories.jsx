import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import InstrumentsLegend from '.';
import ReadMe from './README.md';

storiesForComponent('Components|InstrumentsLegend', module, ReadMe)
  .add('basic usage', () => (
    <InstrumentsLegend />
  ));

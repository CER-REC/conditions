import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import SmallMultiplesLegend from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend', module, ReadMe)
  .add('basic usage', () => (
    <SmallMultiplesLegend />
  ));

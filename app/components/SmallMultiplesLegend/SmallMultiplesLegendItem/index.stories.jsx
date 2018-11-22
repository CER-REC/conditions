import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import SmallMultiplesLegendItem from './';
import ReadMe from './README.md';

storiesForComponent('Components|SmallMultiplesLegend/SmallMultiplesLegendItem', module, ReadMe)
  .add('basic usage', () => (
    <SmallMultiplesLegendItem />
  ));

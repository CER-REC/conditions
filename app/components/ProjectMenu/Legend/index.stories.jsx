import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Legend from './';
import ReadMe from './README.md';

const legendType = 'Theme';

storiesForComponent('Components|ProjectLegend', module, ReadMe)
  .add('No props', () => (
    <Legend />
  ))
  .add('Required props', () => (
    <Legend legendType={legendType} />
  ));


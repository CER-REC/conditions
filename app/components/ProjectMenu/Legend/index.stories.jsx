import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Legend from './';
import ReadMe from './README.md';

const legendType = 'Theme';

storiesForComponent('Components|ProjectMenu/Legend', module, ReadMe)
  .add('No props', () => (
    <Legend legendType="" />
  ))
  .add('Required props', () => (
    <Legend legendType={legendType} />
  ));


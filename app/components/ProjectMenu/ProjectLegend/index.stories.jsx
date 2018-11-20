import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

const legendItems = [
  { name: 'condition 1', count: 1 },
  { name: 'condition 2', count: 45 },
  { name: 'condition 3', count: 55 },
  { name: 'condition 4', count: 23 },
  { name: 'condition 5', count: 3 },
  { name: 'condition 6', count: 13 },
];

storiesForComponent('Components|ProjectLegend', module, ReadMe)
  .add('Default props', () => (
    <ProjectMenu />
  ))
  .add('With legend items', () => (
    <ProjectMenu items={legendItems} />
  ));


import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectChart from './';
import ReadMe from './README.md';

const graphData = [
  { name: 'condition 1', count: 1, color: 'red' },
  { name: 'condition 2', count: 45, color: 'orange' },
  { name: 'condition 3', count: 55, color: 'yellow' },
  { name: 'condition 4', count: 23, color: 'green' },
  { name: 'condition 5', count: 3, color: 'blue' },
  { name: 'condition 6', count: 13, color: 'indigo' },
  { name: 'condition 7', count: 3, color: 'violet' },
];

const chartType = 'Theme';

storiesForComponent('Components|ProjectMenu/ProjectChart', module, ReadMe)
  .add('No props', () => (
    <ProjectChart
      graphData={[]}
      chartType=""
    />
  ))
  .add('With legend items', () => (
    <ProjectChart
      graphData={graphData}
      chartType={chartType}
    />
  ));


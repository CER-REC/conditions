import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

const projectData = [
  {
    id: 1223,
    name: 'Project Name 1',
    graphData: [{ name: 'condition 1', count: 5, color: 'pink' }, { name: 'condition 2', count: 0, color: 'green' }],
  },
  {
    id: 1224,
    name: 'Project Name 2',
    graphData: [{ name: 'condition 1', count: 10, color: 'pink' }, { name: 'condition 2', count: 19, color: 'green' }],
  },
  {
    id: 1225,
    name: 'Project Name 3',
    graphData: [{ name: 'condition 1', count: 4, color: 'pink' }, { name: 'condition 2', count: 29, color: 'green' }],
  },
  {
    id: 1226,
    name: 'Project Name 4',
    graphData: [{ name: 'condition 1', count: 6, color: 'pink' }, { name: 'condition 2', count: 22, color: 'green' }],
  },
  {
    id: 1227,
    name: 'Project Name 5',
    graphData: [{ name: 'condition 1', count: 5, color: 'pink' }, { name: 'condition 2', count: 0, color: 'green' }],
  },
  {
    id: 1228,
    name: 'Project Name 6',
    graphData: [{ name: 'condition 1', count: 10, color: 'pink' }, { name: 'condition 2', count: 19, color: 'green' }],
  },
  {
    id: 1229,
    name: 'Project Name 7',
    graphData: [{ name: 'condition 1', count: 4, color: 'pink' }, { name: 'condition 2', count: 29, color: 'green' }],
  },
  {
    id: 1230,
    name: 'Project Name 8',
    graphData: [{ name: 'condition 1', count: 6, color: 'pink' }, { name: 'condition 2', count: 22, color: 'green' }],
  },
];

const selectedProjectID = 1226;

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .add('Default Props', () => (
    <ProjectMenu
      projectData={projectData}
      selectedProjectID={selectedProjectID}
      onChange={() => {}}
    />
  ));


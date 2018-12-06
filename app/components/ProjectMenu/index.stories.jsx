import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

const projectData = [
  {
    id: 1223,
    name: 'Project Name 1',
    graphData: [{ name: 'condition 1', count: 5 }, { name: 'condition 2', count: 0 }],
  },
  {
    id: 1224,
    name: 'Project Name 2',
    graphData: [{ name: 'condition 1', count: 10 }, { name: 'condition 2', count: 19 }],
  },
  {
    id: 1225,
    name: 'Project Name 3',
    graphData: [{ name: 'condition 1', count: 4 }, { name: 'condition 2', count: 29 }],
  },
  {
    id: 1226,
    name: 'Project Name 4',
    graphData: [{ name: 'condition 1', count: 6 }, { name: 'condition 2', count: 22 }],
  },
  {
    id: 1227,
    name: 'Project Name 1',
    graphData: [{ name: 'condition 1', count: 5 }, { name: 'condition 2', count: 0 }],
  },
  {
    id: 1228,
    name: 'Project Name 2',
    graphData: [{ name: 'condition 1', count: 10 }, { name: 'condition 2', count: 19 }],
  },
  {
    id: 1229,
    name: 'Project Name 3',
    graphData: [{ name: 'condition 1', count: 4 }, { name: 'condition 2', count: 29 }],
  },
  {
    id: 1230,
    name: 'Project Name 4',
    graphData: [{ name: 'condition 1', count: 6 }, { name: 'condition 2', count: 22 }],
  },
];

const selectedProjectID = 1226;

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .add('With project data', () => (
    <ProjectMenu
      projectData={projectData}
      selectedProjectID={selectedProjectID}
      onChange={() => {}}
    />
  ));


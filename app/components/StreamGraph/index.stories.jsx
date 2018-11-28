import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Streamgraph from './';
import ReadMe from './README.md';

const projectData = [
  {
    id: 'Security',
    graphData: {
      date: 2010,
      count: 0,
    },
  },
  {
    id: 'Management System',
    graphData: {
      date: 2017,
      count: 1436,
    },
  },
  {
    id: 'Integrity Management',
    graphData: {
      date: 2013,
      count: 1000,
    },
  },
  {
    id: 'Standard Condition',
    graphData: {
      date: 2015,
      count: 500,
    },
  },
];

storiesForComponent('Components|Streamgraph', module, ReadMe)
  .add('No props', () => (
    <Streamgraph
      projectData={[]}
    />
  ))
  .add('With values', () => (
    <Streamgraph
      projectData={projectData}
    />
  ));

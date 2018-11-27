import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Streamgraph from './';
import ReadMe from './README.md';

const projectData = [
  { id: 'stream one', count: 133, color: 'violet' },
  { id: 'stream two', count: 500, color: 'blue' },
  { id: 'stream three', count: 700, color: 'pink' },
  { id: 'stream four', count: 1300, color: 'yellow' },
];

storiesForComponent('Components|Streamgraph', module, ReadMe)
  .add('No props', () => (
    <Streamgraph
      projectData={[]}
    />
  ))
  .add('With required props', () => (
    <Streamgraph
      projectData={projectData}
    />
  ));

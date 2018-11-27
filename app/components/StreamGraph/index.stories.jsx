import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Streamgraph from './';
import ReadMe from './README.md';

storiesForComponent('Components|Streamgraph', module, ReadMe)
  .add('No props', () => (
    <Streamgraph
      projectData={[]}
    />
  ))
  .add('With required props', () => (
    <Streamgraph
      projectData={[]}
    />
  ));

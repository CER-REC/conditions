import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectDot from '.';
import ReadMe from './README.md';

storiesForComponent('Components|CompanyWheel/ProjectDot', module, ReadMe)
  .add('default', () => (
    <svg height="100" width="100">
      <ProjectDot />;
    </svg>
  ))
  .add('filtered', () => (
    <svg height="100" width="100">
      <ProjectDot filtered />;
    </svg>
  ))
  .add('relevant', () => (
    <svg height="100" width="100">
      <ProjectDot relevant />;
    </svg>
  ));

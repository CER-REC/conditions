import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

storiesForComponent('Components|ProjectLegend', module, ReadMe)
  .add('default', () => (
    <ProjectMenu />
  ));


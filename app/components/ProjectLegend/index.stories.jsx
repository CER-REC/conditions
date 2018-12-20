import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectLegend from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ProjectLegend', module, ReadMe)
  .add('default', () => (
    <ProjectLegend />
  ));

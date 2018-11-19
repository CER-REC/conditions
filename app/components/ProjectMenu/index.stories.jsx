import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .add('default', () => (
    <ProjectMenu />
  ));


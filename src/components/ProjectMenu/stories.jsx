import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ProjectMenu from '.';
import ReadMe from './README.md';
import { projectsData } from '../../mockData';

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withStyles(`
    .ProjectMenu { width: 400px; border: 1px solid red; }
  `))
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .add('Default Props', () => (
    <ProjectMenu
      projectsData={projectsData.counts}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: { selectedProjectID: null },
      actions: { onChange: () => v => ({ selectedProjectID: v }) },
    },
  })
  .add('At left', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 3)}
      selectedProjectID={1225}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('At right', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 3)}
      selectedProjectID={1227}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Single project', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 1)}
      selectedProjectID={1225}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Four near left', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 4)}
      selectedProjectID={1226}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Four near right', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 4)}
      selectedProjectID={1227}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Three at middle', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 3)}
      selectedProjectID={1226}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ));

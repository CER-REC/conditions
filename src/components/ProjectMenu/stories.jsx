import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ProjectMenu from '.';
import ReadMe from './README.md';
import { projectsData, loadingProjectsData } from '../../mockData';

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withStyles(`
    .ProjectMenu { width: 400px; height: 412px; border: 1px solid red; }
  `))
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .add('Default Props', () => (
    <ProjectMenu
      projectsData={projectsData}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: { selectedProjectID: 1226 },
      actions: { onChange: () => v => ({ selectedProjectID: v }) },
    },
  })
  .add('Loading 1', () => (
    <ProjectMenu
      projectsData={[{ ...loadingProjectsData, id: 0 }]}
      selectedProjectID={0}
      selectedFeature="theme"
      loading
      {...getInteractionProps()}
    />
  ))
  .add('Loading 5', () => (
    <ProjectMenu
      projectsData={Array(5).fill(loadingProjectsData).map((v, id) => ({ ...v, id }))}
      selectedProjectID={0}
      selectedFeature="theme"
      loading
      {...getInteractionProps()}
    />
  ))
  .add('At left', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 2)}
      selectedProjectID={1225}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('At right', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 3)}
      selectedProjectID={1227}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Single project', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 1)}
      selectedProjectID={1225}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Four near left', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 4)}
      selectedProjectID={1226}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Four near right', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 4)}
      selectedProjectID={1227}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ))
  .add('Three at middle', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 3)}
      selectedProjectID={1226}
      selectedFeature="theme"
      {...getInteractionProps()}
    />
  ));

import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ProjectMenu from '.';
import ReadMe from './README.md';
import { projectsData } from '../../mockData';

const options = projectsData.counts.reduce((acc, next) => ({
  ...acc,
  [next.name]: next.id,
}), {});

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .ProjectMenu { width: 400px; border: 1px solid red; }
  `))
  .add('Default Props', () => (
    <ProjectMenu
      projectsData={projectsData.counts}
      selectedProjectID={select('Selected Project', options, 1228)}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At left', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 2)}
      selectedProjectID={1226}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At right', () => (
    <ProjectMenu
      projectsData={projectsData.counts.slice(0, 2)}
      selectedProjectID={1228}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ));

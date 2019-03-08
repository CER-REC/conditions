import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ProjectMenu from '.';
import ReadMe from './README.md';

const projectData = [
  {
    id: 1223,
    name: '1. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 5 }, { name: 'MANAGEMENT_SYSTEM', count: 0 }],
  },
  {
    id: 1224,
    name: '2. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 10 }, { name: 'MANAGEMENT_SYSTEM', count: 19 }],
  },
  {
    id: 1225,
    name: '3. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 4 }, { name: 'MANAGEMENT_SYSTEM', count: 29 }],
  },
  {
    id: 1226,
    name: '4. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 6 }, { name: 'MANAGEMENT_SYSTEM', count: 22 }],
  },
  {
    id: 1227,
    name: '5. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 5 }, { name: 'MANAGEMENT_SYSTEM', count: 0 }],
  },
  {
    id: 1228,
    name: '6. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 10 }, { name: 'MANAGEMENT_SYSTEM', count: 19 }],
  },
  {
    id: 1229,
    name: '7. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 4 }, { name: 'MANAGEMENT_SYSTEM', count: 29 }],
  },
  {
    id: 1230,
    name: '8. Section 21.(1) application',
    graphData: [{ name: 'SECURITY', count: 6 }, { name: 'MANAGEMENT_SYSTEM', count: 22 }],
  },
];

const options = projectData.reduce((acc, next) => ({
  ...acc,
  [next.name]: next.id,
}), {});

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .ProjectMenu { max-width: 600px; width: 100%; height: 50vh; border: 1px solid red; }
  `))
  .add('Default Props', () => (
    <ProjectMenu
      projectData={projectData}
      selectedProjectID={select('Selected Project', options, 1226)}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At left', () => (
    <ProjectMenu
      projectData={projectData.slice(0, 3)}
      selectedProjectID={1223}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At right', () => (
    <ProjectMenu
      projectData={projectData.slice(0, 3)}
      selectedProjectID={1225}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ));


import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ProjectMenu from '../../components/ProjectMenu';
import FeaturesLegend from '../../components/FeaturesLegend';
import ReadMe from './README.md';
import ViewTwo from '.';

const legendItems = [
  { color: 'pink', description: 'security', disabled: true },
  { color: 'red', description: 'managementSystem', disabled: false },
  { color: 'green', description: 'financial', disabled: false },
  { color: 'blue', description: 'damagePrevention', disabled: false },
  { color: 'purple', description: 'socioEconomic', disabled: false },
];

const projectData = [
  {
    id: 1223,
    name: '1. Section 21.(1) application',
    graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
  },
  {
    id: 1224,
    name: '2. Section 21.(1) application',
    graphData: [{ name: 'security', count: 10, color: 'pink' }, { name: 'managementSystem', count: 19, color: 'green' }],
  },
  {
    id: 1225,
    name: '3. Section 21.(1) application',
    graphData: [{ name: 'security', count: 4, color: 'pink' }, { name: 'managementSystem', count: 29, color: 'green' }],
  },
  {
    id: 1226,
    name: '4. Section 21.(1) application',
    graphData: [{ name: 'security', count: 6, color: 'pink' }, { name: 'managementSystem', count: 22, color: 'green' }],
  },
  {
    id: 1227,
    name: '5. Section 21.(1) application',
    graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
  },
];

const components = [
  <div style={{ height: '10%' }} />,
  <FeaturesLegend
    legendItems={legendItems}
    selectedFeature="theme"
    isProjectLegend
  />,
  <ProjectMenu
    projectData={projectData}
    selectedProjectID={1225}
    onChange={() => {}}
    selectedFeature="theme"
  />,
];

storiesForView('Containers|ViewTwo', module, ReadMe)
  .add('default', () => (
    <ViewTwo components={0} />
  ))
  .add('with components', () => (
    <ViewTwo components={components} />
  ));

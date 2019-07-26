/* eslint-disable no-sparse-arrays */
import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ProjectChart from '.';
import ReadMe from './README.md';

const graphData = [
  { name: 'SECURITY', count: 1 },
  { name: 'MANAGEMENT_SYSTEM', count: 45 },
  { name: 'FINANCIAL', count: 55 },
  { name: 'DAMAGE_PREVENTION', count: 23 },
  { name: 'SAFETY_MANAGEMENT', count: 3 },
  { name: 'SOCIO_ECONOMIC', count: 13 },
  { name: 'EMERGENCY_MANAGEMENT', count: 3 },
];

const chartType = 'theme';
const projectName = '3. Section 21.(1) application';

storiesForComponent('Components|ProjectMenu/ProjectChart', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('With legend items', () => (
    <ProjectChart
      graphData={graphData}
      chartType={chartType}
      projectName={projectName}
      selected={boolean('Selected project', true)}
      relevantProjectLookup={{ 1: true, 2: true, 3: true, 4: false, 5: true }}
      filteredProjectLookup={{ 1: true, 2: true, 3: true, 4: false, 5: true }}
      projectId={1}
    />
  ))
  .add('Empty graphData', () => (
    <ProjectChart
      chartType={chartType}
      projectId={1}
    />
  ));

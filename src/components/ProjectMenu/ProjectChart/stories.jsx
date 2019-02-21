import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ProjectChart from '.';
import ReadMe from './README.md';

const graphData = [
  { name: 'SECURITY', count: 1, color: 'red' },
  { name: 'MANAGEMENT_SYSTEM', count: 45, color: 'orange' },
  { name: 'FINANCIAL', count: 55, color: 'yellow' },
  { name: 'DAMAGE_PREVENTION', count: 23, color: 'green' },
  { name: 'SAFETY_MANAGEMENT', count: 3, color: 'blue' },
  { name: 'SOCIO_ECONOMIC', count: 13, color: 'indigo' },
  { name: 'EMERGENCY_MANAGEMENT', count: 3, color: 'violet' },
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
    />
  ))
  .add('Empty graphData', () => (
    <ProjectChart
      chartType={chartType}
    />
  ));


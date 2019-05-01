import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionCompanies from '.';

const companies = [
  { id: '1', name: 'Canada-Montana Pipe Line Company' },
  { id: '2', name: 'Express Pipeline Ltd.' },
  { id: '3', name: 'Kinder Morgan Cochin Ulc.' },
  { id: '4', name: 'Nova Gas Transmission Ltd.' },
  { id: '11', name: 'Alberta Trans-Alta è' },
  { id: '12', name: 'Alberta Trans-Alta e' },
  { id: '13', name: 'Z-Anti' },
  { id: '14', name: 'Power Plants R Us' },
];
const active = ['3'];

storiesForComponent('Components|RegionCompanies', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['openProjectDetails'] }))
  .addDecorator(withStyles(`
    .storyWrapper { position: relative; width: 300px; height: 500px; }
  `))
  .add('default', () => (
    <div className="storyWrapper">
      <RegionCompanies
        companies={companies}
        activeConditionCompanies={active}
        {...getInteractionProps()}
      />
    </div>
  ), {
    actions: {
      openProjectDetails: () => {},
    },
  });

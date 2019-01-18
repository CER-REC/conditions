import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionCompanies from '.';

const companies = [
  { id: '1', name: 'Canada-Montana Pipe Line Company' },
  { id: '2', name: 'Express Pipeline Ltd.' },
  { id: '3', name: 'Kinder Morgan Cochin Ulc.' },
  { id: '4', name: 'Nova Gas Transmission Ltd.' },
];
const active = ['3'];
const noop = () => {};

storiesForComponent('Components|RegionCompanies', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['openProjectDetails'] }))
  .add('default', () => (
    <RegionCompanies
      companies={companies}
      activeConditionCompanies={active}
      {...getInteractionProps()}
    />
  ), {
    actions: {
      onChange: noop,
      openProjectDetails: () => {},
    },
  });

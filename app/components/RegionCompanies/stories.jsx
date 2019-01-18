import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionCompanies from '.';

const companies = ['Express Pipeline Ltd.', 'Kinder Morgan Cochin Ulc.', 'Canada-Montana Pipe Line Company', 'Nova Gas Transmission Ltd.'];
const active = ['Kinder Morgan Cochin Ulc.'];
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

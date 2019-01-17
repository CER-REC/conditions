import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';
import RegionalCompanies from '.';

const companies = ['Canada-Montana Pipe Line Company', 'Express Pipeline Ltd.', 'Kinder Morgan Cochin Ulc.', 'Nova Gas Transmission Ltd.'];
const active = ['Kinder Morgan Cochin Ulc.'];
const noop = () => {};

storiesForComponent('Components|RegionalCompanies', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onChange', 'someInteractionPropFunc'] }))
  .add('default', () => (
    <RegionalCompanies
      companies={companies}
      activeConditionCompanies={active}
      openProjectDetails={noop}
    />
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import TotalConditionsLabel from '.';
import ReadMe from './README.md';

const noop = () => {};

storiesForComponent('Components|TotalConditionsLabel', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .add('default', () => (
    <TotalConditionsLabel openNumberDetails={noop} />
  ));

import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('Basic view', () => (
    <MainInfoBar
      {...getInteractionProps()}
    />
  ));

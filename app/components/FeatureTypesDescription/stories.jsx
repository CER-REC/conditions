import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
// import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypeDescription from '.';
import ReadMe from './README.md';

storiesForComponent('Components|FeatureTypeDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <FeatureTypeDescription />
  ));

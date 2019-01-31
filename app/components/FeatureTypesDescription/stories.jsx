import React from 'react';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
// import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypeDescription from '.';
import ReadMe from './README.md';

fixInfo(FeatureTypeDescription);

storiesForComponent('Components|FeatureTypeDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <FeatureTypeDescription />
  ))
  .add('instrument types', () => (
    <FeatureTypeDescription feature="instrument" />
  ));

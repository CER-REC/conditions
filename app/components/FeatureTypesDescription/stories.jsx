import React from 'react';
import { storiesForComponent, fixInfo } from '../../../.storybook/utils';
// import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withStatus from '../../../.storybook/addon-status';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

fixInfo(FeatureTypesDescription);

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <FeatureTypesDescription />
  ))
  .add('instrument types', () => (
    <FeatureTypesDescription feature="instrument" />
  ));

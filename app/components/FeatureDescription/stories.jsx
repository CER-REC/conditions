import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeatureDescription from '.';
import ReadMe from './README.md';

const description = 'components.featureDescription.theme';
const feature = 'theme';

storiesForComponent('Components|FeatureDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('basic usage', () => (
    <FeatureDescription feature={feature} description={description} />
  ));


import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import FeaturesMenu from '.';
import ReadMe from './README.md';

storiesForComponent('Components|FeaturesMenu', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: { onChange: () => v => ({ selected: v }) },
    state: { selected: 'instrument' },
  }))
  .add('basic usage', () => (
    <FeaturesMenu {...getInteractionProps()} />
  ))
  .add('drop down', () => (
    <FeaturesMenu {...getInteractionProps()} dropDown />
  ));

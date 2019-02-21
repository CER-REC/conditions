import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Dropdown from '.';
import ReadMe from './README.md';

const features = ['theme', 'instrument', 'phase', 'type', 'status', 'filing'];

storiesForComponent('Components|Dropdown', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .addDecorator(withKnobs)
  .addDecorator(withInteraction({
    actions: ['onChange'],
  }))
  .add('with interaction', () => (
    <Dropdown
      options={features}
      {...getInteractionProps()}
      optionID="common.features"
    />
  ), {
    interaction: {
      state: {
        selectedOption: features[0],
      },
      actions: {
        onChange: () => e => ({ selectedOption: e }),
      },
    },
  });

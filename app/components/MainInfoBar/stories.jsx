import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['handleOnClick'] }))
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('with state toggle', () => (
    <MainInfoBar
      {...getInteractionProps()}
      dialog={['About', 'Methodology', 'Downloads']}
    />
  ), {
    interaction: {
      state: { activeDialog: '' },
      actions: { handleOnClick: () => v => ({ activeDialog: v }) },
    },
  });


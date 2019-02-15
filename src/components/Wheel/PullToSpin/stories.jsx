import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';

import PullToSpin from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Wheel/PullToSpin', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: {
      onClickSpin: () => v => ({ selected: v }),
    },
  }))
  .add('default', () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="310 -5 110 80">
      <PullToSpin role="button" {...getInteractionProps()} transform="scale(2)" />
    </svg>
  ));


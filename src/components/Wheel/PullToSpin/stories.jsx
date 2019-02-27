import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';

import PullToSpin from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Wheel/PullToSpin', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClickSpin'] }))
  .add('default', () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="310 -5 110 80" transform="scale(0.25)">
      <PullToSpin {...getInteractionProps()} />
    </svg>
  ));


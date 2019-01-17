import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';

import PullToSpin from '.';
import ReadMe from './README.md';

storiesForComponent('Components|CompanyWheel/PullToSpin', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <PullToSpin role="button" onSpinClick={() => alert('Start spinning')} />
  ));


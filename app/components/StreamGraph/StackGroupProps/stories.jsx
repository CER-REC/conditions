import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';

import StackGroupProps from '.';

storiesForComponent('Components|StreamGraph/StackGroupProps', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('With docs', () => (
    <StackGroupProps />
  ));

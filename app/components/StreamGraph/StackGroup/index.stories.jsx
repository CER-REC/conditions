import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';

import StackGroup from '.';

storiesForComponent('Components|StreamGraph/StackGroup', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('With docs', () => (
    <StackGroup />
  ));

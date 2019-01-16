import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';

storiesForComponent('Components|StreamGraph/StackGroup', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'));

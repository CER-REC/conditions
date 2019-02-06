import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import MethodologyTextBox from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar/MethodologyTextBox', module, ReadMe)
  .add('Basic view', () => (
    <MethodologyTextBox />
  ));

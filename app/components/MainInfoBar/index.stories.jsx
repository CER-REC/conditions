import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import MainInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .add('Basic view', () => (
    <MainInfoBar />
  ));

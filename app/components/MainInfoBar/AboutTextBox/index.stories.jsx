import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import AboutTextBox from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar/AboutTextBox', module, ReadMe)
  .add('Basic view', () => (
    <AboutTextBox />
  ));

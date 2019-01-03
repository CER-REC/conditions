import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import DownloadsTextBox from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar/DownloadsTextBox', module, ReadMe)
  .add('Basic view', () => (
    <DownloadsTextBox />
  ));

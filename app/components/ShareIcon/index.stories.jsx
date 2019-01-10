import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ShareIcon from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ShareIcon', module, ReadMe)
  .add('Basic view', () => (
    <ShareIcon />
  ));

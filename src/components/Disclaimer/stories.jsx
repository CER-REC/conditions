import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';
import Disclaimer from '.';

storiesForComponent('Components|Disclaimer', ReadMe)
  .add('default', () => <Disclaimer />);

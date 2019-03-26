import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import SkipIntro from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SkipIntro', module, ReadMe)
  .add('default', () => (
    <SkipIntro />
  ))
  .add('view 1', () => (
    <SkipIntro showArrow />
  ));

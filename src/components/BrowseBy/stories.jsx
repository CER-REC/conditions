import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BrowseBy from '.';
import ReadMe from './README.md';

storiesForComponent('Components|BrowseBy', module, ReadMe)
  .add('default', () => (
    <BrowseBy />
  ))
  .add('view 1', () => (
    <BrowseBy showArrow labelId="skip" />
  ))
  .add('view 3', () => (
    <BrowseBy labelId="return" />
  ));

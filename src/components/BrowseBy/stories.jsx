import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import BrowseBy from '.';
import ReadMe from './README.md';

const noop = () => {};

storiesForComponent('Components|BrowseBy', module, ReadMe)
  .add('default', () => (
    <BrowseBy labelId="skip" onClick={noop} browseBy="company" />
  ))
  .add('view 1', () => (
    <BrowseBy showArrow labelId="skip" onClick={noop} browseBy="company" />
  ))
  .add('view 3', () => (
    <BrowseBy labelId="return" onClick={noop} browseBy="company" />
  ));

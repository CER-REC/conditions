import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import GuideTransport from '.';
import ReadMe from './README.md';

const noop = () => {};

storiesForComponent('Components|GuideTransport', module, ReadMe)
  .add('default', () => (
    <GuideTransport back={noop} forward={noop} togglePlay={noop} />
  ))
  .add('playing', () => (
    <GuideTransport playing back={noop} forward={noop} togglePlay={noop} />
  ));

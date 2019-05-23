import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import GuideTransport from '.';
import ReadMe from './README.md';

storiesForComponent('Components|GuideTransport', module, ReadMe)
  .add('default', () => (
    <GuideTransport />
  ));

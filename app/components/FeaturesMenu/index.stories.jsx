import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesMenu from './';
import ReadMe from './README.md';

storiesForComponent('Components|FeaturesMenu', module, ReadMe)
  .add('basic usage', () => (
    <FeaturesMenu />
  ));

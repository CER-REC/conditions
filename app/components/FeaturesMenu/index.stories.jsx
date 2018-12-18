import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeaturesMenu from './';
import ReadMe from './README.md';

storiesForComponent('Components|FeaturesMenu', module, ReadMe)
  .add('basic usage', () => (
    <FeaturesMenu
      title="Title"
      features={['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']}
      onChange={feature => alert(feature)}
    />
  ))
  .add('drop down', () => (
    <FeaturesMenu
      title="Title"
      features={['TEST ABC', 'TEST 123', 'test']}
      onChange={feature => alert(feature)}
      dropDown
    />
  ));

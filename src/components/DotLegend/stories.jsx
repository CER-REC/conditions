import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';

import DotLegend from '.';

import ReadMe from './README.md';

storiesForComponent('Components|DotLegend', module, ReadMe)
  .add('default', () => (
    <DotLegend />
  ));

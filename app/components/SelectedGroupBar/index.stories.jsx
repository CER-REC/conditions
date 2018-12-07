import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import SelectedGroupBar from './';
import ReadMe from './README.md';

storiesForComponent('Components|SelectedGroupBar', module, ReadMe)
  .add('default', () => (
    <SelectedGroupBar group="Conditions" groupitem="condition" />
  ));


import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import IconSelector from './';
import ReadMe from './README.md';

storiesForComponent('Components|IconSelector', module, ReadMe)
  .add('default', () => (
    <IconSelector>
      <span role="img" aria-label="Emoji">😎</span>
    </IconSelector>
  ))
  .add('List Arrow', () => (
    <IconSelector
      background="#fff"
      border="2px solid pink"
    >
      &lt;
    </IconSelector>
  ))
  .add('Conditions Count', () => (
    <IconSelector
      background="#000"
      color="#fff"
    >
      150
    </IconSelector>
  ))
  .add('Reg Docs Modal Icon', () => (
    <IconSelector
      background="#c10568"
      color="#fff"
    >
      +
    </IconSelector>
  ));

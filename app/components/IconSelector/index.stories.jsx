import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import IconSelector from './';
import ReadMe from './README.md';
import handleInteraction from '../../utilities/handleInteraction';

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
      color="pink"
      size="48px"
    >
      &lt;
    </IconSelector>
  ))
  .add('Conditions Count', () => (
    <IconSelector
      background="pink"
      color="#fff"
      size="48px"
    >
      150
    </IconSelector>
  ))
  .add('Selector with Drop-shadow', () => (
    <IconSelector
      className="shadow"
      background="pink"
      color="#fff"
      size="48px"
    >
    &nbsp;
    </IconSelector>
  ))
  .add('Selector is highlighted after search', () => (
    <IconSelector
      className="searched"
      background="#000"
      size="48px"
    >
    &nbsp;
    </IconSelector>
  ))
  .add('different size', () => (
    <IconSelector
      className="searched"
      background="#000"
      size="24px"
    >
    &nbsp;
    </IconSelector>
  ))
  .add('implemented onClick functionality', () => (
    <IconSelector
      onClick={handleInteraction}
      className="shadow"
      background="#000"
      size="48px"
    >
    &nbsp;
    </IconSelector>
  ))
  .add('Reg Docs Modal Icon', () => (
    <IconSelector
      background="#c10568"
      color="#fff"
      size="48px"
    >
      +
    </IconSelector>
  ));

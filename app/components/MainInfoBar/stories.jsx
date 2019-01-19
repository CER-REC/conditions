import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withKnobs)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('Basic view', () => (
    <MainInfoBar
      activeDialog={select('TextBox', ['', 'About', 'Methodology', 'Downloads'], '')}
    />
  ))
  .add('With prop: About', () => (
    <MainInfoBar
      activeDialog="About"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ))
  .add('With prop: Methodology', () => (
    <MainInfoBar
      activeDialog="Methodology"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ))
  .add('With prop: Downloads', () => (
    <MainInfoBar
      activeDialog="Downloads"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ));

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
      textBox={select('TextBox', ['', 'About', 'Methodology', 'Downloads'], '')}
    />
  ))
  .add('With prop: About', () => (
    <MainInfoBar
      textBox="About"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ))
  .add('With prop: Methodology', () => (
    <MainInfoBar
      textBox="Methodology"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ))
  .add('With prop: Downloads', () => (
    <MainInfoBar
      textBox="Downloads"
      onChange={() => alert('clicked')}
      handleOnClick={() => alert('clicked')}
    />
  ));

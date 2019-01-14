import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShortCutInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ShortCutInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('Basic view', () => (
    <ShortCutInfoBar
      onChange={() => {}}
    />
  ))
  .add('Expanded view', () => (
    <ShortCutInfoBar
      onChange={() => {}}
      handleInfoBar={() => alert('clicked')}
    />
  ));

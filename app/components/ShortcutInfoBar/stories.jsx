import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShortcutInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|ShortcutInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('Basic view', () => (
    <ShortcutInfoBar
      onChange={() => {}}
    />
  ))
  .add('Expanded view', () => (
    <ShortcutInfoBar
      onChange={() => {}}
      handleInfoBar={() => alert('clicked')}
      handleInfoButton={() => alert('clicked')}
    />
  ));

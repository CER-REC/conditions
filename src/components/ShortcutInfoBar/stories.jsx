import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShortcutInfoBar from '.';
import ReadMe from './README.md';

const jumpToAbout = () => {};
const openDataModal = () => {};

storiesForComponent('Components|ShortcutInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <ShortcutInfoBar
      jumpToAbout={jumpToAbout}
      openDataModal={openDataModal}
    />
  ));

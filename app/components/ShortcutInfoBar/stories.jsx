import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShortcutInfoBar from '.';
import ReadMe from './README.md';

const handleInfoBar = false;
const jumpToAbout = () => {};
const openDataModal = () => {};
const openScreenshotModal = () => {};

storiesForComponent('Components|ShortcutInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('Basic view', () => (
    <ShortcutInfoBar
      onChange={() => {}}
      handleInfoBar={handleInfoBar}
      jumpToAbout={jumpToAbout}
      openDataModal={openDataModal}
      openScreenshotModal={openScreenshotModal}
    />
  ))
  .add('Expanded view', () => (
    <ShortcutInfoBar
      onChange={() => {}}
      handleInfoBar
      openDataModal={() => {}}
      openScreenshotModal={() => {}}
      jumpToAbout={jumpToAbout}
    />
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Arrow from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Arrow', module, ReadMe)
  .addDecorator(withStatus('designUnderDevelopment'))
  .add('default arrow', () => (
    <Arrow orientation="Up" />
  ))
  .add('Up orientation', () => (
    <Arrow orientation="Up" />
  ))
  .add('Down orientation', () => (
    <Arrow orientation="Down" />
  ))
  .add('Right orientation', () => (
    <Arrow orientation="Right" />
  ))
  .add('Left orientation', () => (
    <Arrow orientation="Left" />
  ));

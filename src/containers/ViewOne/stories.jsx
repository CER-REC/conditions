import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewOne from '.';

const noop = () => {};

storiesForView('Containers|ViewOne', module, ReadMe)
  .add('default', () => <ViewOne jumpToAbout={noop} />)
  .add('layout only', () => <ViewOne layoutOnly jumpToAbout={noop} />);

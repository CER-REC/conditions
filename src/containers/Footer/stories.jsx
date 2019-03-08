import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import Footer from '.';

const noop = () => {};

const mainInfoBar = {
  setActiveDialog: noop,
  toggleExpanded: noop,
  openDataModal: noop,
  openScreenshotModal: noop,
};

storiesForView('Containers|Footer', module, ReadMe)
  .add('default', () => <Footer mainInfoBar={mainInfoBar} />)
  .add('layout only', () => <Footer layoutOnly />);

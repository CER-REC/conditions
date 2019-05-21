import React from 'react';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import App from '.';

const noop = () => {};

storiesForView('Containers|App', module, ReadMe)
  .add('default', () => (
    <App
      openIntermediatePopup={noop}
      openProjectDetails={noop}
    />
  ));

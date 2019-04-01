import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

import RegdocsPopup from '.';

const noop = () => {};

storiesForComponent('Components|RegdocsPopup', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RegdocsPopup
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      instrument="XO-001-2018"
    />
  ));

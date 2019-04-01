import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';

import RegDocsPopup from '.';

const noop = () => {};

storiesForComponent('Components|RegDocsPopup', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RegDocsPopup
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      instrument="XO-001-2018"
      regdocsUrl="https://www.example.com"
    />
  ));

import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import RegDocs from '.';
// import ReadMe from './README.md';
const ReadMe = '';

const noop = () => {};

storiesForComponent('Components|RegDocsPopup/RegDocs', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <RegDocs
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      instrument="XO-001-2018"
      regdocsUrl="https://www.example.com"
    />
  ));

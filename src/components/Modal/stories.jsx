import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import Modal from '.';
import ReadMe from './README.md';

const noop = () => {};
const component = () => (<div>I am a child component</div>);

storiesForComponent('Components|Modal', module, ReadMe)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Modal
      component={component}
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      height="100px"
      width="300px"
    />
  ));

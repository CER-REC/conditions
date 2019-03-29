import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Modal from '.';
import ReadMe from './README.md';

const noop = () => {};

const component = () => (<div>I am a child component</div>);

storiesForComponent('Components|Modal', module, ReadMe)
  .add('default', () => (
    <Modal
      component={component}
      isOpen
      closeModal={noop}
      height="100px"
      width="300px"
    />
  ));

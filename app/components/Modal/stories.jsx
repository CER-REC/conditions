import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Modal from '.';
import ReadMe from './README.md';

const noop = () => {};

const content = {
  image: (<div> image here</div>),
  data: (<div>data here </div>),
};

const options = {
  range: true,
  min: 350,
  max: 1920,
  step: 50,
};

storiesForComponent('Components|Modal', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('Image Download', () => (
    <Modal
      height={`${number('Height of Modal (px)', 600, options)}px`}
      width={`${number('Width of Modal (px)', 600, options)}px`}
      title="Image Download"
      content={content.image}
      modalAction={{
        text: 'Save Image',
        task: noop,
      }}
    />))
  .add('Data Download', () => (
    <Modal
      height={`${number('Height of Modal (px)', 600, options)}px`}
      width={`${number('Width of Modal (px)', 600, options)}px`}
      title="Data Download"
      content={content.data}
    />
  ));

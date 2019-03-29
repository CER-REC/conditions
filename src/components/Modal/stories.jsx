import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Modal from '.';
import ReadMe from './README.md';

import Download from './Download';

const noop = () => {};

const contentProps = {
  image: {
    type: 'image',
    modalAction: () => alert('Hi!'),
    title: 'Image Download',
    content: (<div>image here</div>),
  },
  data: {
    type: 'data',
    modalAction: noop,
    title: 'Data Download',
    content: (<div>data here</div>),
  },
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
      // title="Image Download"
      content={{
        component: Download,
        props: contentProps.image,
      }}
      // contentProps={contentProps.image}
      // modalAction={noop}
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      // type="image"
    />
  ))
  .add('Data Download', () => (
    <Modal
      height={`${number('Height of Modal (px)', 600, options)}px`}
      width={`${number('Width of Modal (px)', 600, options)}px`}
      // title="Data Download"
      content={{
        component: Download,
        props: contentProps.data,
      }}
      isOpen={boolean('Visible', true)}
      closeModal={noop}
      // type="data"
    />
  ));

import React from 'react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Modal from '../Modal';
import ReadMe from './README.md';

// import Download from '.';
// import RegDocs from '../Modal/RegDocs';
import DownloadPopup from '.';

const noop = () => {};

const componentProps = {
  image: {
    type: 'image',
    modalAction: noop,
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

storiesForComponent('Components|DownloadPopup', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('Image Download', () => (
    <DownloadPopup
      isOpen={boolean('Visible', true)}
      closeModal={noop}
    />
  ));

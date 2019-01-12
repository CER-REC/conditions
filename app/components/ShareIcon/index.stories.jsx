import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShareIcon from '.';
import ReadMe from './README.md';

library.add(
  faTwitter,
  faAngleUp,
);

storiesForComponent('Components|ShareIcon', module, ReadMe)
  .addDecorator(withStatus('underReview'))
  .add('default icon', () => (
    <ShareIcon icon="angle-up" />
  ))
  .add('with props: onChange', () => (
    <ShareIcon icon="angle-up" onChange={() => alert('clicked')} />
  ));


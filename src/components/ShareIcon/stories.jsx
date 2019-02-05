import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ShareIcon from '.';
import ReadMe from './README.md';

library.add(
  faTwitter,
);

storiesForComponent('Components|ShareIcon', module, ReadMe)
  .addDecorator(withStatus('underReview'))
  .add('twitter', () => <ShareIcon target="twitter" />)
  .add('facebook', () => <ShareIcon target="facebook" />)
  .add('linkedin', () => <ShareIcon target="linkedin" />)
  .add('email', () => <ShareIcon target="email" prefix="fas" />);


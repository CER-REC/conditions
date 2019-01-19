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
  .add('default icon', () => (
    <ShareIcon icon="twitter" target="twitter" />
  ))
  .add('with props: onChange', () => (
    <ShareIcon icon="twitter" target="twitter" onChange={() => alert('clicked')} />
  ));


import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Icon from '.';
import ReadMe from './README.md';

library.add(
  faTwitter,
  faAngleRight,
);

storiesForComponent('Components|Icon', module, ReadMe)
  .addDecorator(withStatus('underReview'))
  .add('default icon', () => (
    <Icon icon="angle-right" />
  ))
  .add('with props: prefix', () => (
    <Icon icon="twitter" prefix="fab" />
  ))
  .add('with props: color', () => (
    <Icon icon="angle-right" color="blue" />
  ))
  .add('with props: size', () => (
    <Icon icon="angle-right" size="10x" />
  ));


import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import Icon from './';
import ReadMe from './README.md';

storiesForComponent('Components|Icon', module, ReadMe)
  .add('default icon', () => (
    <Icon icon="archive" />
  ))
  .add('with props: prefix', () => (
    <Icon icon="google" prefix="fab" />
  ))
  .add('with props: color', () => (
    <Icon icon="archive" color="blue" />
  ))
  .add('with props: size', () => (
    <Icon icon="archive" size="10x" />
  ));


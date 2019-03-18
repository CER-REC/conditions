import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import Ring from '.';
import ReadMe from './README.md';
import './styles.scss';

storiesForComponent('Components|Wheel/Ring', module, ReadMe)
  .addDecorator(withStyles)
  .addDecorator(withStatus('underReview'))
  .add('default view', () => (
    <svg viewBox="0 0 860 860">
      <Ring ringType="company" />
    </svg>
  ), { styles: '.Wheel { padding-top: unset }' })
  .add('location view', () => (
    <svg viewBox="0 0 860 860">
      <Ring ringType="location" />
    </svg>
  ), { styles: '.Wheel { padding-top: unset }' });


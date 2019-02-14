import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import Ring from '.';
import ReadMe from './README.md';
import './styles.scss';

storiesForComponent('Components|Wheel/Ring', module, ReadMe)
  .addDecorator(withStatus('underReview'))
  .add('default view', () => (
    <svg className="WheelContainer" viewBox="120 200 500 500">
      <Ring className="WheelContainer" ringType="Company" />
    </svg>
  )).add('location view', () => (
    <svg className="WheelContainer" viewBox="120 200 500 500">
      <Ring className="WheelContainer" ringType="Location" />
    </svg>
  ));

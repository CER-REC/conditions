import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import GreyPipe from '.';
import ReadMe from './README.md';

storiesForComponent('Components|GreyPipe', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withStyles(`
    .storyWrapper {position: relative; height: 400px; width: 200px;}
  `))
  .add('company', () => (
    <div className="storyWrapper">
      <GreyPipe mode="company" />
    </div>
  ))
  .add('location', () => (
    <div className="storyWrapper">
      <GreyPipe mode="location" />
    </div>
  ))
  .add('company w/ count bubbles', () => (
    <div className="storyWrapper">
      <GreyPipe
        mode="company"
        conditionCount={42}
        instrumentCount={15}
        projectCount={1}
      />
    </div>
  ));

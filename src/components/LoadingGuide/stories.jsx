import React from 'react';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import LoadingGuide from '.';
import ReadMe from './README.md';

storiesForComponent('Components|LoadingGuide', module, ReadMe)
  .addDecorator(withStyles(`
    .storyWrapper {
      height: 200px;
      width: 200px;
      position: relative;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 50px;
    }
  `))
  .add('default', () => (
    <div className="storyWrapper">
      <LoadingGuide />
    </div>
  ));

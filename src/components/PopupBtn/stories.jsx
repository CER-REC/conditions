import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import PopupBtn from '.';

import ReadMe from './README.md';

storiesForComponent('Components|PopupBtn', module, ReadMe)
  .add('default', () => (
    <PopupBtn
      linkUrl="https://www.example.com"
      text="Example"
      icon="plus"
    />
  ))
  .add('link attributes', () => (
    <PopupBtn
      linkUrl="https://www.example.com"
      text="Example"
      icon="plus"
      attributes={{ target: '_blank', noopener: true, noreferrer: true }}
    />
  ))
  .add('button', () => (
    <PopupBtn
      onClick={() => alert('Who\'s there?')}
      text="Knock, knock"
      icon="x"
    />
  ));

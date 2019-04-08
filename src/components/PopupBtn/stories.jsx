import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import PopupBtn from '.';

import ReadMe from './README.md';

storiesForComponent('Components|PopupBtn', module, ReadMe)
  .add('default', () => (
    <PopupBtn
      action="https://www.example.com"
      text="Example"
      icon="plus"
    />
  ))
  .add('link attributes', () => (
    <PopupBtn
      action="https://www.example.com"
      text="Example"
      icon="plus"
      attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
    />
  ))
  .add('button', () => (
    <PopupBtn
      action={() => alert('Who\'s there?')}
      text="Knock, knock"
      icon="x"
    />
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import PopupBtn from '.';

import ReadMe from './README.md';

storiesForComponent('Components|PopupBtn', module, ReadMe)
  .add('default', () => (
    <PopupBtn
      action="https://www.example.com"
      icon="plus"
    >
      Example
    </PopupBtn>
  ))
  .add('link attributes', () => (
    <PopupBtn
      action="https://www.example.com"
      icon="plus"
      attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
    >
      Example
    </PopupBtn>
  ))
  .add('button', () => (
    <PopupBtn
      action={() => alert('Who\'s there?')}
      icon="x"
    >
      Knock, knock
    </PopupBtn>
  ));

import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import PopupBtn from '.';

import ReadMe from './README.md';

storiesForComponent('Components|PopupBtn', module, ReadMe)
  .add('default', () => (
    <PopupBtn
      url="https://www.example.com"
      icon="plus"
    >
      Example
    </PopupBtn>
  ))
  .add('link attributes', () => (
    <PopupBtn
      url="https://www.example.com"
      icon="plus"
      attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
    >
      Example
    </PopupBtn>
  ))
  .add('link with onClick', () => (
    <PopupBtn
      url="https://www.example.com"
      icon="plus"
      attributes={{ target: '_blank', rel: 'noopener noreferrer' }}
      action={() => alert("This shouldn't block the link.")}
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

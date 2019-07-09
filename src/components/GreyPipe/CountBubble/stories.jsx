import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CountBubble from '.';
import ReadMe from './README.md';

storiesForComponent('Components|GreyPipe/CountBubble', module, ReadMe)
  .add('default', () => <CountBubble count={42} textId="projects" />)
  .add('singular', () => <CountBubble count={1} textId="conditions" />)
  .add('large value', () => <CountBubble count={1723} textId="instruments" />);

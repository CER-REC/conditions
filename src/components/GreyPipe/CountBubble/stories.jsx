import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import CountBubble from '.';
import ReadMe from './README.md';

storiesForComponent('Components|GreyPipe/CountBubble', module, ReadMe)
  .add('default', () => <CountBubble count={42} textId="projects" />);

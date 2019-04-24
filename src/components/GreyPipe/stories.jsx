import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import GreyPipe from '.';
import ReadMe from './README.md';

storiesForComponent('Components|GreyPipe', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <section style={{ position: 'relative', height: '400px', width: '200px' }}>
      <GreyPipe />
    </section>
  ));

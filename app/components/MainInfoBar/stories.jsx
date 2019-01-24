import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import MainInfoBar from '.';
import ReadMe from './README.md';

storiesForComponent('Components|MainInfoBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('with state toggle', () => (
    <MainInfoBar
      onChange={() => {}}
      dialog={['About', 'Methodology', 'Downloads']}
    />
  ));


import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Process from './process.md';

storiesOf('Documentation|Testing', module)
  .add('Process', doc(Process));

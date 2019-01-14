import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Process from './process.md';
import Documentation from './documentation.md';

storiesOf('Documentation|Testing', module)
  .add('Process', doc(Process))
  .add('Documentation', doc(Documentation));

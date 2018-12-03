import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Testing from './testing.md';

storiesOf('Documentation|Testing', module)
  .add('Tests', doc(Testing));

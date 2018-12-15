import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import Git from './git.md';
import Code from './code.md';

storiesOf('Documentation|Standards', module)
  .add('Git', doc(Git))
  .add('Code', doc(Code));

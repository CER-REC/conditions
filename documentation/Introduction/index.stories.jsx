import React from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import README from './README.md';
import ProgressMatrix from './ProgressMatrix';
import CHANGELOG from '../../CHANGELOG.md';

storiesOf('Documentation|Introduction', module)
  .add('to the document', doc(README))
  .add('progress matrix', () => <ProgressMatrix />)
  .add('changelog', doc(CHANGELOG));

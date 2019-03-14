import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import README from './README.md';
import CHANGELOG from '../../CHANGELOG.md';

storiesOf('Documentation|Introduction', module)
  .add('to the document', doc(README))
  .add('changelog', doc(CHANGELOG));

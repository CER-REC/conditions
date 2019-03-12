import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { doc } from 'storybook-readme';
import README from './README.md';
import CHANGELOG from '../../CHANGELOG.md';

storiesOf('Introduction', module)
  .addDecorator(withViewport('documentation'))
  .add('to the document', doc(README))
  .add('changelog', doc(CHANGELOG));

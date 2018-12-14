import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { doc } from 'storybook-readme';
import Visualization from './visualization.md';
import Document from './document.md';

storiesOf('Documentation|Introduction', module)
  .addDecorator(withViewport('documentation'))
  .add('to the visualization', doc(Visualization))
  .add('to the document', doc(Document));

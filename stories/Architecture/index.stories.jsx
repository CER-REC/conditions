import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';
import { doc } from 'storybook-readme';
import HighLevel from './highLevel.md';
import ComponentStructure from './componentStructure.md';

storiesOf('Docs|Architecture', module)
  .add('High Level', doc(HighLevel))
  .add('Component Structure', doc(ComponentStructure));

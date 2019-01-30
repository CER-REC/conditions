import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import HighLevel from './highLevel.md';
import Component from './components.md';
import View from './views.md';
import Translation from './translations.md';

storiesOf('Documentation|Architecture', module)
  .add('High Level', doc(HighLevel))
  .add('Components', doc(Component))
  .add('Views', doc(View))
  .add('Translations', doc(Translation));

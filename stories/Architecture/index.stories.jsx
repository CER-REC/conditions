import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import HighLevel from './highLevel.md';
import Component from './components.md';
import Container from './containers.md';

storiesOf('Documentation|Architecture', module)
  .add('High Level', doc(HighLevel))
  .add('Components', doc(Component))
  .add('Containers', doc(Container));

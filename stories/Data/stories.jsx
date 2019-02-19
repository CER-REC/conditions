import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import GraphQL from './GraphQL.md';

storiesOf('Documentation|Data', module)
  .add('GraphQL', doc(GraphQL));

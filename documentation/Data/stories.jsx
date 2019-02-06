import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import GraphQL from './GraphQL.md';
import State from './state.md';

storiesOf('Documentation|Data', module)
  .add('GraphQL', doc(GraphQL))
  .add('State', doc(State));

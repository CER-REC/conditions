import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import GraphQL from './GraphQL.md';
import Information from './information.md';
import Redux from './redux.md';

storiesOf('Documentation|Data', module)
  .add('GraphQL', doc(GraphQL))
  .add('Information', doc(Information))
  .add('Redux', doc(Redux));

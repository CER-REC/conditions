import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import NEB from './NEB.md';
import iLab from './iLab.md';
import GraphQL from './GraphQL.md';

storiesOf('Documentation|Data', module)
  .add('from NEB', doc(NEB))
  .add('from iLab', doc(iLab))
  .add('GraphQL', doc(GraphQL));

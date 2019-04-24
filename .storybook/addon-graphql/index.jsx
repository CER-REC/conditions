import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import graphQLEndPoint from '../../globals';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: graphQLEndPoint,
});
const client = new ApolloClient({ cache, link, fetch });

const addGQL = (storyFn, context) => (
  <ApolloProvider client={client}>{storyFn(context)}</ApolloProvider>
);

export default makeDecorator({
  name: 'withGQL',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => addGQL(getStory, context),
});
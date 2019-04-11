import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const defaultOptions = {};

function addGQL(storyFn, context, providedOptions) {
  const props = {
    ...defaultOptions,
    ...providedOptions,
  };

  const cache = new InMemoryCache();
  const link = new HttpLink({
    // TODO SET GLOBAL URL
    uri: 'http://178.128.239.141/conditions/graphql',
  });
  const client = new ApolloClient({ cache, link, fetch });

  return (
    <ApolloProvider client={client} {...props}>
      {storyFn(context)}
    </ApolloProvider>
  );
}

const optionToObject = (val = {}) => (typeof val === 'boolean' ? { wrapped: val } : val);

export default makeDecorator({
  name: 'withGQL',
  parameterName: 'wrapped',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const parametersObj = optionToObject(parameters);
    // Hide if this was used as a decorator for both the storybook and a story.
    if (!parametersObj) { return getStory(context); }

    const mergedOptions = { ...parametersObj };
    return addGQL(getStory, context, mergedOptions);
  },
});

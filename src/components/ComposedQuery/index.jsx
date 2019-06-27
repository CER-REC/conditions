import React from 'react';
import { Query } from 'react-apollo';

export default ({ children, ...props }) => {
  const composedQuery = Object.entries(props)
    // Allow the props to be undefined so that queries can be dynamically added
    .filter(([, query]) => !!query)
    .reduce((acc, [name, query]) => prevQueries => (
      <Query {...query} key={name}>
        {(result) => {
          const merged = {
            queryInfo: {
              ...prevQueries.data,
              [name]: result,
            },
            data: {
              ...prevQueries.data,
              [name]: result.data ? Object.values(result.data)[0] : null,
            },
            loading: prevQueries.loading || result.loading,
            errors: prevQueries.errors,
          };
          if (result.error) {
            const { graphQLErrors, networkError } = result.error;
            const error = new Error(result.error.message);

            error.graphQLErrors = [];
            if (graphQLErrors.length) {
              error.graphQLErrors = graphQLErrors.map(v => JSON.stringify(v));
            }

            if (networkError) {
              const networkDetails = { ...networkError.result };
              if (networkDetails.errors) {
                networkDetails.errors = networkDetails.errors.map(v => v.message);
              }
              if (networkDetails.StackTrace) {
                networkDetails.StackTrace = networkDetails.StackTrace
                  .split('\n')
                  .map(v => `  ${v}`)
                  .join('\n');
                networkDetails.StackTrace = `\n${networkDetails.StackTrace}`;
              }
              const formattedNetwork = Object.entries(networkDetails)
                .map(([k, v]) => `  ${k}: ${v}`)
                .join('\n');
              error.networkError = `${networkError.message}\n${formattedNetwork}`;
            }

            // Immediately throw the error so that it is caught by our ErrorBoundary
            throw error;
          }
          return acc(merged);
        }}
      </Query>
    ), children);

  return composedQuery({ queryInfo: {}, data: {}, loading: false, errors: null });
};

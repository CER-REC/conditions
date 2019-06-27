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
            // Immediately throw the error so that it is caught by our ErrorBoundary
            throw new Error(result.error);
          }
          return acc(merged);
        }}
      </Query>
    ), children);

  return composedQuery({ queryInfo: {}, data: {}, loading: false, errors: null });
};

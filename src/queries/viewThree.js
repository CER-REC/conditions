import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const viewThreeQuery = gql`
  query companies {
    allCompanies {
      id
      name
      projectIds
    }
  }
`;

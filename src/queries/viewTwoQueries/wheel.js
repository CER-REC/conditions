import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const companyWheelQuery = gql`
  query companies {
    allCompanies {
      id
      name
      projectIds
    }
  }
`;

import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const companyWheelQuery = gql`{
  allCompanies {
    id
    name
    projectIds
  }
}`;

// TODO: once region data is integrated in query add locationWheelQuery


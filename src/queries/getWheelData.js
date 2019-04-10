import gql from 'graphql-tag';

export const companyWheelQuery = gql`{
	allCompanies {
    id
    name
    projectIds
  }
}`;


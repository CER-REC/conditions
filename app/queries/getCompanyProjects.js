import gql from 'graphql-tag';

export default gql`query getCompanyProjects($companyID: ID!) {
  getCompanyProjects(companyID: $companyID) {
    id
    name
    featureConditionCounts {
      theme {
        Standard condition
        Integrity Management
        Environmental Protection
        ...
      }
      instrument {
        ...
      }
      ...
    }
  }
}`;

import gql from 'graphql-tag';

export default gql`query getProjectInstrumentsAndConditions($projectID: ID!) {
  getProjectInstrumentsAndConditions(projectID: $projectID) {
    instruments {
      id
      effectiveDate
      conditions {
        keywords
        text
      }
    }
  }
}`;

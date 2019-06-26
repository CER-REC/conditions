import gql from 'graphql-tag';

export default gql`
  query {
    allConfigurationData {
      displayOrder {
        filing
        phase
        status
        type
        theme
        instrument
      }
      instrumentYearRange {
        max
        min
      }
      lastUpdated
    }
  }
`;

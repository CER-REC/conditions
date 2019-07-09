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
      }
      instrumentYearRange {
        max
        min
      }
      lastUpdated
      keywordCategories
    }
  }
`;

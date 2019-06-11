import gql from 'graphql-tag';

export default gql`
  query getDateDataUpdated {
    allConfigurationData {
      lastUpdated
    }
  }
`;

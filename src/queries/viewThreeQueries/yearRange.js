import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const yearRange = gql`
  query allConfigurationData {
    allConfigurationData {
      instrumentYearRange {
        min
        max
      }
    }
  }
`;

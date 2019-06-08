import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export default gql`
  query {
    allConfigurationData {
      displayOrder {
        # TODO: en/fr should automatically return for the current language
        conditionFiling {
          en
        }
        conditionPhase {
          en
        }
        conditionStatus {
          en
        }
        conditionType {
          en
        }
        instrumentStatus {
          en
        }
        projectStatus {
          en
        }
        theme {
          en
        }
      }
      instrumentYearRange {
        max
        min
      }
      lastUpdated
    }
  }
`;

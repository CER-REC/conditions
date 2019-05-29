import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const displayOrder = gql`
  query {
    allConfigurationData{
      displayOrder {
        conditionPhase {
          en
        }
        conditionStatus {
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
    }
  }
`;

import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const projectMenuQuery = gql`
  query ProjectMenu ($id: Int!) {
    allProjectsByCompany(companyId: $id) {
      id
      status
      shortName
      name
      aggregatedCount: aggregatedCountArray {
        filing
        filingEnum
        phase
        phaseEnum
        status
        statusEnum
        theme
        themeEnum
        type
        typeEnum
        instrument: prefix
        instrumentEnum: prefixEnum

      }
      numberOfConditions
      numberOfInstruments
    }
  }
`;

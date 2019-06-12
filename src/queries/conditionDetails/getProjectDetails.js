import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export default gql`
  query getConditionDetails($projectId: Int!){
    getProjectById(id:$projectId) {
      shortName{
        en
        fr
      }
      name {
        en
        fr
      }
      companies {
        name
      }
      instruments {
        id
        name
        prefix
        status
        regions {
          name {
            en
            fr
          }
          province
        }
        number
        dateSunset
        dateIssuance
        dateEffective
        conditions {
          theme
          phase
          filingRequired
          standardCondition
          status
          id
          textLength
          text {
            en
            fr
          }
          aggregatedCountArray {
            filing
            filingEnum
            phase
            phaseEnum
            prefix
            prefixEnum
            status
            statusEnum
            theme
            themeEnum
            type
            typeEnum
          }
        }
      }
    }
  }
`;

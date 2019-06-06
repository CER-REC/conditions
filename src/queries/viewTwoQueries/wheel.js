import gql from 'graphql-tag';

export const companyWheelQuery = gql`
  query companies {
    allCompanies {
      id
      name
      projectIds
    }
  }
`;

export const locationWheelQuery = gql`
  query regions {
    allRegions {
      id
      name {
        en
      }
      province
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
    }
  }
`;

export const companiesByRegionQuery = gql`
  query companiesByRegion ($id: Int!) {
    companiesByRegionId: getCompaniesByRegionId (id: $id){
      name
      id
      projects {
        instruments {
          regions {
            name {
              en
            }
          }
        }
      }
    }
  }
`;

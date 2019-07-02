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
      name
      province
      aggregatedCount {
        filing { name, count }
        phase { name, count }
        status { name, count }
        theme { name, count }
        type { name, count }
        instrument { name, count }
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
            name
          }
        }
      }
    }
  }
`;

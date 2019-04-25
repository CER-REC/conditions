import gql from 'graphql-tag';

export const viewTwoQuery = gql`
  query companies {
    allCompanies {
      id
      name
      projectIds
    }
  }
`;

// TODO: once region data is integrated in query add locationWheelQuery

export const projectMenuQuery = gql`
  query projectMenu($id:Int) {
    allProjectsByCompany (companyId: $id) {
      id
      status
    }
  }
`;

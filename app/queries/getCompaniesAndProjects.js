import gql from 'graphql-tag';

export default gql`query getCompaniesAndProjects {
  getAllCompanies {
    id
    name
  }

  getAllProjects {
    id
    name
    companyIDs
  }
}`;

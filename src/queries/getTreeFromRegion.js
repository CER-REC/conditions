import gql from 'graphql-tag';

export default gql`
  query getTreeFromRegion($id: Int!) {
    getRegionById(id: $id){
      instruments {
        id
        project {
          id
          companyIds
        }
      }
    }
  }
`;

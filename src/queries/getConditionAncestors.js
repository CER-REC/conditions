import gql from 'graphql-tag';

export default gql`
  query getConditionAncestors($id: Int!) {
    getConditionById(id: $id){
      instrumentId
      instrument {
        projectId
        project {
          companyIds
        }
      }
      text {
        en
      }
    }
  }
`;

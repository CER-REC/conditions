import gql from 'graphql-tag';

export default gql`
  query getTreeFromCondition($id: Int!) {
    getConditionById(id: $id){
      instrumentId
      instrument {
        projectId
        project {
          companyIds
        }
        regionIds
      }
    }
  }
`;

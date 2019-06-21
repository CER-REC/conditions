import gql from 'graphql-tag';

export default gql`
  query getTreeFromInstrument($id: Int!) {
    getInstrumentById(id: $id){
      conditions {
        id
      }
      projectId
      project {
        companyIds
      }
    }
  }
`;

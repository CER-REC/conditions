import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const viewThreeQuery = gql`
  query instrumentsByProject($id: Int!) {
    allInstrumentsByProject(projectId: $id){
      dateEffective
      dateIssuance
      dateSunset
      id
      name
      projectId
      regionIds
      status
    }
  }
`;

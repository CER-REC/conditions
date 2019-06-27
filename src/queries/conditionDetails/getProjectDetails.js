import gql from 'graphql-tag';

export default gql`
  query getProjectDetails($projectId: Int!) {
    getProjectById(id:$projectId) {
      shortName
      name
      companies {
        name
      }
    }
  }
`;

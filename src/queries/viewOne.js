import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const viewOneQuery = gql`
  query companies {
    allKeywords {
      name
    }
  }
`;

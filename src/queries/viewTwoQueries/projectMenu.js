import gql from 'graphql-tag';
import { THEME_FRAGMENT, STATUS_FRAGMENT, TYPE_FRAGMENT, FILING_FRAGMENT, PHASE_FRAGMENT } from '../featuresFragments';

// eslint-disable-next-line import/prefer-default-export
export const projectMenuQuery = gql`
  query ProjectMenu ($id: Int!) {
    allProjectsByCompany(companyId: $id) {
      id
      status
      shortName {
        en
      }
      name {
        en
      }
      aggregatedCount {
        ...theme
        ...status
        ...type
        ...filing
        ...phase
      }
    }
  }

  ${THEME_FRAGMENT}
  ${STATUS_FRAGMENT}
  ${TYPE_FRAGMENT}
  ${FILING_FRAGMENT}
  ${PHASE_FRAGMENT}
`;


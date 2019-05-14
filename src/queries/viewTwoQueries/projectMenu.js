import gql from 'graphql-tag';

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
          theme {
            ADMINISTRATIVE
            DAMAGE_PREVENTION
            EMERGENCY_MANAGEMENT
            ENFORCEMENT
            ENGINEERING
            ENVIRONMENTAL_PROTECTION
            FINANCIAL
            INTEGRITY_MANAGEMENT
            LANDOWNER
            MANAGEMENT_SYSTEM
            SAFETY_MANAGEMENT
            SECURITY
            SOCIO_ECONOMIC
            STANDARD_CONDITION
            SUNSET_CLAUSE
          }
          status {
            CLOSED
            IN_PROGRESS
          }
          type {
            NON_STANDARD
            STANDARD
          }
          filing {
            NOT_REQUIRED
            REQUIRED
          }
          phase {
            ABANDONMENT
            DURING_CONSTRUCTION_PHASE
            EXPIRY_DATE_OF_REG_INSTR
            INCLUDES_ALL_PHASES_OF_CONSTR
            NOT_CONSTRUCTION_RELATED
            POST_CONSTRUCTION_PHASE
            PRIOR_TO_CONSTRUCTION_PHASE
            UNSPECIFIED
          }
      }
    }
  }
`;
// export const projectMenuQuery = gql`
//   query ProjectMenu($id: Int!) {
//     allProjectsByCompany (companyId: $id) {
//       id
//       status
//     }
//   }
// `;

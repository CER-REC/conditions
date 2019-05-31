import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export default gql`
  query getProject($projectId: Int!){
    getProjectById(id:$projectId) {
      shortName{
        en
        fr
      }
      name {
        en
        fr
      }
      companies {
        name
      }
      instruments {
        id
        name
        instrumentPrefix
        status
        regions {
          name {
            en
            fr
          }
          province
        }
        instrumentNumber
        dateSunset
        dateIssuance
        dateEffective
        conditions {
          id
          textLength
          text {
            en
            fr
          }
          aggregatedCount {
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
            status {
              CLOSED
              IN_PROGRESS
            }
            theme {
              ADMINISTRATIVE
              DAMAGE_PREVENTION
              EMERGENCY_MANAGEMENT
              ENFORCEMENT
              ENVIRONMENTAL_PROTECTION
              FINANCIAL
              INTEGRITY_MANAGEMENT
              MANAGEMENT_SYSTEM
              SOCIO_ECONOMIC
              STANDARD_CONDITION
              SUNSET_CLAUSE
              SECURITY
              SAFETY_MANAGEMENT
            }
            type {
              NON_STANDARD
              STANDARD
            }
          }
        }
      }
    }
  }
`;

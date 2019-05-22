import gql from 'graphql-tag';

export const THEME_FRAGMENT = gql`
fragment theme on AggregatedCountType{
  theme {
    ADMINISTRATIVE
    DAMAGE_PREVENTION
    EMERGENCY_MANAGEMENT
    ENFORCEMENT
    ENVIRONMENTAL_PROTECTION
    FINANCIAL
    INTEGRITY_MANAGEMENT
    MANAGEMENT_SYSTEM
    SAFETY_MANAGEMENT
    SECURITY
    SOCIO_ECONOMIC
    STANDARD_CONDITION
    SUNSET_CLAUSE
  }
}
`;

export const STATUS_FRAGMENT = gql`
fragment status on AggregatedCountType{
  status {
    CLOSED
    IN_PROGRESS
  }
}
`;

export const TYPE_FRAGMENT = gql`
fragment type on AggregatedCountType{
  type {
    NON_STANDARD
    STANDARD
  }
}
`;

export const FILING_FRAGMENT = gql`
fragment filing on AggregatedCountType{
  filing {
    NOT_REQUIRED
    REQUIRED
  }
}
`;

export const PHASE_FRAGMENT = gql`
fragment phase on AggregatedCountType{
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
`;
import gql from 'graphql-tag';

const instrumentFields = `
  id
  name
  prefix
  status
  regions {
    name
    province
  }
  number
  dateSunset
  dateIssuance
  dateEffective
  conditions {
    theme
    phase
    filingRequired
    standardCondition
    status
    id
    textLength
    text
    aggregatedCountArray {
      filing
      filingEnum
      phase
      phaseEnum
      prefix
      prefixEnum
      status
      statusEnum
      theme
      themeEnum
      type
      typeEnum
    }
  }
`;

export const project = gql`
  query allInstrumentsByProject($id: Int!) {
    allInstrumentsByProject(projectId: $id) {
      ${instrumentFields}
    }
  }
`;

export const region = gql`
  query allInstrumentsByRegion($id: Int!) {
    allInstrumentsByRegion(regionId: $id) {
      ${instrumentFields}
    }
  }
`;

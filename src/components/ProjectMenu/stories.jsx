import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ProjectMenu from '.';
import ReadMe from './README.md';

const projectsData = [
  {
    id: 1226,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInFrench',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInFrench',
    },
    data: {
      instrument: {
        ROUTING: 12,
        CONSTRUCTION: 11,
        ABANDONMENT: 1,
        OPENING: 22,
        MISC: 2,
        SAFETY: 9,
        TARIFFS: 11,
      },
      theme: {
        ADMINISTRATIVE: 10,
        DAMAGE_PREVENTION: 0,
        EMERGENCY_MANAGEMENT: 2,
        ENFORCEMENT: 5,
        ENVIRONMENTAL_PROTECTION: 3,
        FINANCIAL: 0,
        INTEGRITY_MANAGEMENT: 11,
        MANAGEMENT_SYSTEM: 2,
        SAFETY_MANAGEMENT: 7,
        SECURITY: 1,
        SOCIO_ECONOMIC: 11,
        STANDARD_CONDITION: 0,
        SUNSET_CLAUSE: 15,
      },
      phase: {
        ABANDONMENT: 2,
        DURING_CONSTRUCTION_PHASE: 7,
        EXPIRY_DATE_OF_REGULATORY_INSTRUMENT: 6,
        INCLUDES_ALL_PHASES_OF_CONSTRUCTION: 12,
        NOT_CONSTRUCTION_RELATED: 33,
        POST_CONSTRUCTION_PHASE: 4,
        PRIOR_TO_CONSTRUCTION_PHASE: 2,
        UNSPECIFIED: 5,
      },
      status: {
        IN_PROGRESS: 1,
        CLOSED: 8,
        NO_FILING_REQUIRED: 2,
        AWAITING_FILING: 22,
        OVERDUE_FILING: 0,
        UNDER_REVIEW: 7,
        REVIEW_COMPLETE: 4,
        AWAITING_IR_RESPONSE: 8,
        READY_FOR_BOARD_DECISION: 3,
        FURTHER_INFORMATION_REQUIRED: 12,
        AMENDED: 0,
        SATISFACTORY: 7,
      },
      type: {
        NON_STANDARD: 3,
        STANDARD: 11,
      },
      filing: {
        REQUIRED: 0,
        NOT_REQUIRED: 7,
      },
    },
  },
  {
    id: 1227,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInFrench',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInFrench',
    },
    data: {
      instrument: {
        ROUTING: 12,
        CONSTRUCTION: 11,
        ABANDONMENT: 1,
        OPENING: 22,
        MISC: 2,
        SAFETY: 9,
        TARIFFS: 11,
      },
      theme: {
        ADMINISTRATIVE: 10,
        DAMAGE_PREVENTION: 0,
        EMERGENCY_MANAGEMENT: 2,
        ENFORCEMENT: 5,
        ENVIRONMENTAL_PROTECTION: 3,
        FINANCIAL: 0,
        INTEGRITY_MANAGEMENT: 11,
        MANAGEMENT_SYSTEM: 2,
        SAFETY_MANAGEMENT: 7,
        SECURITY: 1,
        SOCIO_ECONOMIC: 11,
        STANDARD_CONDITION: 0,
        SUNSET_CLAUSE: 15,
      },
      phase: {
        ABANDONMENT: 2,
        DURING_CONSTRUCTION_PHASE: 7,
        EXPIRY_DATE_OF_REGULATORY_INSTRUMENT: 6,
        INCLUDES_ALL_PHASES_OF_CONSTRUCTION: 12,
        NOT_CONSTRUCTION_RELATED: 33,
        POST_CONSTRUCTION_PHASE: 4,
        PRIOR_TO_CONSTRUCTION_PHASE: 2,
        UNSPECIFIED: 5,
      },
      status: {
        IN_PROGRESS: 1,
        CLOSED: 8,
        NO_FILING_REQUIRED: 2,
        AWAITING_FILING: 22,
        OVERDUE_FILING: 0,
        UNDER_REVIEW: 7,
        REVIEW_COMPLETE: 4,
        AWAITING_IR_RESPONSE: 8,
        READY_FOR_BOARD_DECISION: 3,
        FURTHER_INFORMATION_REQUIRED: 12,
        AMENDED: 0,
        SATISFACTORY: 7,
      },
      type: {
        NON_STANDARD: 3,
        STANDARD: 11,
      },
      filing: {
        REQUIRED: 0,
        NOT_REQUIRED: 7,
      },
    },
  },
  {
    id: 1228,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInFrench',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInFrench',
    },
    data: {
      instrument: {
        ROUTING: 12,
        CONSTRUCTION: 11,
        ABANDONMENT: 1,
        OPENING: 22,
        MISC: 2,
        SAFETY: 9,
        TARIFFS: 11,
      },
      theme: {
        ADMINISTRATIVE: 10,
        DAMAGE_PREVENTION: 0,
        EMERGENCY_MANAGEMENT: 2,
        ENFORCEMENT: 5,
        ENVIRONMENTAL_PROTECTION: 3,
        FINANCIAL: 0,
        INTEGRITY_MANAGEMENT: 11,
        MANAGEMENT_SYSTEM: 2,
        SAFETY_MANAGEMENT: 7,
        SECURITY: 1,
        SOCIO_ECONOMIC: 11,
        STANDARD_CONDITION: 0,
        SUNSET_CLAUSE: 15,
      },
      phase: {
        ABANDONMENT: 2,
        DURING_CONSTRUCTION_PHASE: 7,
        EXPIRY_DATE_OF_REGULATORY_INSTRUMENT: 6,
        INCLUDES_ALL_PHASES_OF_CONSTRUCTION: 12,
        NOT_CONSTRUCTION_RELATED: 33,
        POST_CONSTRUCTION_PHASE: 4,
        PRIOR_TO_CONSTRUCTION_PHASE: 2,
        UNSPECIFIED: 5,
      },
      status: {
        IN_PROGRESS: 1,
        CLOSED: 8,
        NO_FILING_REQUIRED: 2,
        AWAITING_FILING: 22,
        OVERDUE_FILING: 0,
        UNDER_REVIEW: 7,
        REVIEW_COMPLETE: 4,
        AWAITING_IR_RESPONSE: 8,
        READY_FOR_BOARD_DECISION: 3,
        FURTHER_INFORMATION_REQUIRED: 12,
        AMENDED: 0,
        SATISFACTORY: 7,
      },
      type: {
        NON_STANDARD: 3,
        STANDARD: 11,
      },
      filing: {
        REQUIRED: 0,
        NOT_REQUIRED: 7,
      },
    },
  },
  {
    id: 1229,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInFrench',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInFrench',
    },
    data: {
      instrument: {
        ROUTING: 12,
        CONSTRUCTION: 11,
        ABANDONMENT: 1,
        OPENING: 22,
        MISC: 2,
        SAFETY: 9,
        TARIFFS: 11,
      },
      theme: {
        ADMINISTRATIVE: 10,
        DAMAGE_PREVENTION: 0,
        EMERGENCY_MANAGEMENT: 2,
        ENFORCEMENT: 5,
        ENVIRONMENTAL_PROTECTION: 3,
        FINANCIAL: 0,
        INTEGRITY_MANAGEMENT: 11,
        MANAGEMENT_SYSTEM: 2,
        SAFETY_MANAGEMENT: 7,
        SECURITY: 1,
        SOCIO_ECONOMIC: 11,
        STANDARD_CONDITION: 0,
        SUNSET_CLAUSE: 15,
      },
      phase: {
        ABANDONMENT: 2,
        DURING_CONSTRUCTION_PHASE: 7,
        EXPIRY_DATE_OF_REGULATORY_INSTRUMENT: 6,
        INCLUDES_ALL_PHASES_OF_CONSTRUCTION: 12,
        NOT_CONSTRUCTION_RELATED: 33,
        POST_CONSTRUCTION_PHASE: 4,
        PRIOR_TO_CONSTRUCTION_PHASE: 2,
        UNSPECIFIED: 5,
      },
      status: {
        IN_PROGRESS: 1,
        CLOSED: 8,
        NO_FILING_REQUIRED: 2,
        AWAITING_FILING: 22,
        OVERDUE_FILING: 0,
        UNDER_REVIEW: 7,
        REVIEW_COMPLETE: 4,
        AWAITING_IR_RESPONSE: 8,
        READY_FOR_BOARD_DECISION: 3,
        FURTHER_INFORMATION_REQUIRED: 12,
        AMENDED: 0,
        SATISFACTORY: 7,
      },
      type: {
        NON_STANDARD: 3,
        STANDARD: 11,
      },
      filing: {
        REQUIRED: 0,
        NOT_REQUIRED: 7,
      },
    },
  },
  {
    id: 1230,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInFrench',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInFrench',
    },
    data: {
      instrument: {
        ROUTING: 12,
        CONSTRUCTION: 11,
        ABANDONMENT: 1,
        OPENING: 22,
        MISC: 2,
        SAFETY: 9,
        TARIFFS: 11,
      },
      theme: {
        ADMINISTRATIVE: 10,
        DAMAGE_PREVENTION: 0,
        EMERGENCY_MANAGEMENT: 2,
        ENFORCEMENT: 5,
        ENVIRONMENTAL_PROTECTION: 3,
        FINANCIAL: 0,
        INTEGRITY_MANAGEMENT: 11,
        MANAGEMENT_SYSTEM: 2,
        SAFETY_MANAGEMENT: 7,
        SECURITY: 1,
        SOCIO_ECONOMIC: 11,
        STANDARD_CONDITION: 0,
        SUNSET_CLAUSE: 15,
      },
      phase: {
        ABANDONMENT: 2,
        DURING_CONSTRUCTION_PHASE: 7,
        EXPIRY_DATE_OF_REGULATORY_INSTRUMENT: 6,
        INCLUDES_ALL_PHASES_OF_CONSTRUCTION: 12,
        NOT_CONSTRUCTION_RELATED: 33,
        POST_CONSTRUCTION_PHASE: 4,
        PRIOR_TO_CONSTRUCTION_PHASE: 2,
        UNSPECIFIED: 5,
      },
      status: {
        IN_PROGRESS: 1,
        CLOSED: 8,
        NO_FILING_REQUIRED: 2,
        AWAITING_FILING: 22,
        OVERDUE_FILING: 0,
        UNDER_REVIEW: 7,
        REVIEW_COMPLETE: 4,
        AWAITING_IR_RESPONSE: 8,
        READY_FOR_BOARD_DECISION: 3,
        FURTHER_INFORMATION_REQUIRED: 12,
        AMENDED: 0,
        SATISFACTORY: 7,
      },
      type: {
        NON_STANDARD: 3,
        STANDARD: 11,
      },
      filing: {
        REQUIRED: 0,
        NOT_REQUIRED: 7,
      },
    },
  },
];

const options = projectsData.reduce((acc, next) => ({
  ...acc,
  [next.name]: next.id,
}), {});

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .ProjectMenu { width: 400px; border: 1px solid red; }
  `))
  .add('Default Props', () => (
    <ProjectMenu
      projectsData={projectsData}
      selectedProjectID={select('Selected Project', options, 1228)}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At left', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 2)}
      selectedProjectID={1226}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ))
  .add('At right', () => (
    <ProjectMenu
      projectsData={projectsData.slice(0, 2)}
      selectedProjectID={1228}
      onChange={() => {}}
      selectedFeature="theme"
    />
  ));

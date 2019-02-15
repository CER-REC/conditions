import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

const data = [
  {
    instrumentNumber: 'XO-001-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.inProgress',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',
    conditions: [
      {
        length: 3,
        fill: 'pink',
        keywords: ['program'],
        text: 'blah blah blah\nhello world\nlorem ipsum dolor',
        details: {
          theme: 'theme.environmentalProtection',
          instrument: 'instrument.category.construction',
          phase: 'phase.duringConstruction',
          type: 'type.standard',
          status: 'status.inProgress',
          filing: 'status.noFilingReq',
        },
      },
      {
        length: 2,
        fill: 'blue',
        keywords: ['program'],
        text: 'blah blah blah\nhola el mundo\nlorem ipsum dolor',
        details: {
          theme: 'theme.environmentalProtection',
          instrument: 'instrument.category.construction',
          phase: 'phase.duringConstruction',
          type: 'type.standard',
          status: 'status.inProgress',
          filing: 'status.noFilingReq',
        },
      },
    ],
  },
  {
    instrumentNumber: 'XO-003-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.inProgress',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',
    conditions: [
      {
        length: 1,
        fill: 'red',
        keywords: ['program'],
        text: 'blah blah blah\nlorem ipsum dolor',
        details: {
          theme: 'theme.environmentalProtection',
          instrument: 'instrument.category.construction',
          phase: 'phase.duringConstruction',
          type: 'type.standard',
          status: 'status.inProgress',
          filing: 'status.noFilingReq',
        },
      },
      {
        length: 2,
        fill: 'red',
        keywords: ['program'],
        text: 'blah blah blah\nlorem ipsum dolor',
        details: {
          theme: 'theme.environmentalProtection',
          instrument: 'instrument.category.construction',
          phase: 'phase.duringConstruction',
          type: 'type.standard',
          status: 'status.inProgress',
          filing: 'status.noFilingReq',
        },
      },
    ],
  },
  {
    instrumentNumber: 'XO-005-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.inProgress',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',
    conditions: [
      {
        length: 3,
        fill: 'orange',
        keywords: ['program'],
        text: 'blah blah blah\nhello lorem ipsum dolor',
        details: {
          theme: 'theme.environmentalProtection',
          instrument: 'instrument.category.construction',
          phase: 'phase.duringConstruction',
          type: 'type.standard',
          status: 'status.inProgress',
          filing: 'status.noFilingReq',
        },
      },
    ],
  },
];

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  selectedItem: { instrumentIndex: 1, itemIndex: -1 },
  openProjectDetails: project => alert(`Project details for: ${project}`),
  openIntermediatePopup: instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`),
  updateSelectedItem: (instrumentIndex, itemIndex) => alert(`${instrumentIndex}, ${itemIndex}`),
};

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .add('default', () => (
    <ConditionDetails {...defaultProps} />
  ))
  .add('expandable', () => (
    <ConditionDetails
      {...defaultProps}
      selectedItem={{ instrumentIndex: 1, itemIndex: 0 }}
      isExpandable
      expanded
    />
  ));

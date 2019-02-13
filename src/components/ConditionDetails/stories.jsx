import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

const data = [
  {
    instrument: {
      number: 'XO-001-2018',
      issuanceDate: '2014-10-24',
      effectiveDate: '2014-10-24',
      sunsetDate: '2019-01-30',
      status: 'inProgress',
      location: 'Albuquerque, NM',
      type: 'Construction of Oil Pipeline',
      activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',

    },
    conditions: [
      {
        length: 3,
        fill: 'pink',
        keywords: ['program'],
        text: 'blah blah blah\nhello world\nlorem ipsum dolor',
        details: {
          theme: 'environment',
          instrument: 'construction',
          phase: 'duringConstruction',
          type: 'standard',
          status: 'inProgress',
          filing: 'notRequired',
        },
      },
    ],
  },
  {
    instrument: {
      number: 'XO-002-2018',
      issuanceDate: '2014-10-24',
      effectiveDate: '2014-10-24',
      sunsetDate: '2019-01-30',
      status: 'inProgress',
      location: 'Albuquerque, NM',
      type: 'Construction of Oil Pipeline',
      activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',

    },
    conditions: [
      {
        length: 2,
        fill: 'blue',
        keywords: ['program'],
        text: 'blah blah blah\nhola el mundo\nlorem ipsum dolor',
        details: {
          theme: 'environment',
          instrument: 'construction',
          phase: 'duringConstruction',
          type: 'standard',
          status: 'inProgress',
          filing: 'notRequired',
        },
      },
    ],
  },
  {
    instrument: {
      number: 'XO-003-2018',
      issuanceDate: '2014-10-24',
      effectiveDate: '2014-10-24',
      sunsetDate: '2019-01-30',
      status: 'inProgress',
      location: 'Albuquerque, NM',
      type: 'Construction of Oil Pipeline',
      activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',

    },
    conditions: [
      {
        length: 1,
        fill: 'red',
        keywords: ['program'],
        text: 'blah blah blah\nlorem ipsum dolor',
        details: {
          theme: 'environment',
          instrument: 'construction',
          phase: 'duringConstruction',
          type: 'standard',
          status: 'inProgress',
          filing: 'notRequired',
        },
      },
    ],
  },
  {
    instrument: {
      number: 'XO-004-2018',
      issuanceDate: '2014-10-24',
      effectiveDate: '2014-10-24',
      sunsetDate: '2019-01-30',
      status: 'inProgress',
      location: 'Albuquerque, NM',
      type: 'Construction of Oil Pipeline',
      activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',

    },
    conditions: [
      {
        length: 2,
        fill: 'red',
        keywords: ['program'],
        text: 'blah blah blah\nlorem ipsum dolor',
        details: {
          theme: 'environment',
          instrument: 'construction',
          phase: 'duringConstruction',
          type: 'standard',
          status: 'inProgress',
          filing: 'notRequired',
        },
      },
    ],
  },
  {
    instrument: {
      number: 'XO-005-2018',
      issuanceDate: '2014-10-24',
      effectiveDate: '2014-10-24',
      sunsetDate: '2019-01-30',
      status: 'inProgress',
      location: 'Albuquerque, NM',
      type: 'Construction of Oil Pipeline',
      activity: 'IT IS ORDERED that, pursuant to section 58 of the act, the applied-for Project as specified in good lord this is putting me to sleep just typing it out',

    },
    conditions: [
      {
        length: 3,
        fill: 'orange',
        keywords: ['program'],
        text: 'blah blah blah\nhello lorem ipsum dolor',
        details: {
          theme: 'environment',
          instrument: 'construction',
          phase: 'duringConstruction',
          type: 'standard',
          status: 'inProgress',
          filing: 'notRequired',
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
};

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .add('default', () => (
    <ConditionDetails {...defaultProps} />
  ));
// .add('default and searched', () => (
//   <ConditionDetails conditions={itemsBinned} maxWidth={99} maxValue={3} searched={searched} />
// ))
// .add('location weighted', () => (
//   <ConditionDetails conditions={items} maxWidth={256} />
// ))
// .add('location weighted and searched', () => (
//   <ConditionDetails conditions={items} maxWidth={256} searched={searched} />
// ));

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis est non mi euismod, eu bibendum purus varius. ',
  'Donec mattis porta sem sed malesuada. Nulla luctus elit at suscipit tempor. Aenean maximus leo eu massa eleifend gravida. Integer nulla tortor, pulvinar quis arcu non, gravida finibus nulla. ',
  'Quisque in velit sed odio tempor viverra quis id neque. Suspendisse id arcu sed elit feugiat bibendum eu a sem. ',
  'Etiam tincidunt massa ut nisi dictum, vitae ultrices mi sagittis. Nulla facilisi. In convallis massa ac orci dictum semper. ',
  'Maecenas tincidunt sem nec turpis fringilla, et gravida dui congue.',
  'Suspendisse sed ultrices orci. Donec elementum sem aliquet, malesuada tortor at, finibus elit.',
  'Nulla posuere aliquet nibh sit amet porta. Sed tristique arcu non consectetur euismod. Aenean maximus arcu non urna volutpat viverra.',
  'Maecenas sit amet pretium leo, ut vestibulum arcu. Etiam in est ultricies, finibus mi non, aliquam elit. Morbi nec cursus turpis, at dictum massa.',
  'Quisque eu lobortis velit, quis viverra elit.',
].join('\n');

export default [
  {
    instrumentNumber: 'XO-001-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.IN_PROGRESS',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: lorem,
    conditions: [
      {
        binnedValue: 3,
        fill: ['pink', 'green'],
        keywords: ['program'],
        text: `hello ${lorem}`,
        details: {
          theme: 'theme.ENVIRONMENTAL_PROTECTION',
          instrument: 'instrument.CONSTRUCTION',
          phase: 'phase.DURING_CONSTRUCTION_PHASE',
          type: 'type.STANDARD',
          status: 'status.IN_PROGRESS',
          filing: 'filing.REQUIRED',
        },
      },
      {
        binnedValue: 2,
        fill: ['blue', 'red'],
        keywords: ['program'],
        text: lorem,
        details: {
          theme: 'theme.SECURITY',
          instrument: 'instrument.ABANDONMENT',
          phase: 'phase.POST_CONSTRUCTION',
          type: 'type.STANDARD',
          status: 'status.IN_PROGRESS',
          filing: 'filing.REQUIRED',
        },
      },
    ],
  },
  {
    instrumentNumber: 'XO-003-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.IN_PROGRESS',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: lorem,
    conditions: [
      {
        binnedValue: 1,
        fill: ['red'],
        keywords: ['program'],
        text: lorem,
        details: {
          theme: 'theme.ENFORCEMENT',
          instrument: 'instrument.ABANDONMENT',
          phase: 'phase.DURING_CONSTRUCTION_PHASE',
          type: 'type.NON_STANDARD',
          status: 'status.IN_PROGRESS',
          filing: 'status.CLOSED',
        },
      },
      {
        binnedValue: 2,
        fill: ['red'],
        keywords: ['program'],
        text: lorem,
        details: {
          theme: 'theme.SUNSET_CLAUSE',
          instrument: 'instrument.ROUTING',
          phase: 'phase.DURING_CONSTRUCTION_PHASE',
          type: 'type.STANDARD',
          status: 'status.IN_PROGRESS',
          filing: 'filing.REQUIRED',
        },
      },
    ],
  },
  {
    instrumentNumber: 'XO-005-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.CLOSED',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: lorem,
    conditions: [
      {
        binnedValue: 3,
        fill: ['orange', 'yellow', 'teal'],
        keywords: ['program'],
        text: `hello ${lorem}`,
        details: {
          theme: 'theme.ADMINISTRATIVE',
          instrument: 'instrument.OPENING',
          phase: 'phase.INCLUDES_ALL',
          type: 'type.NON_STANDARD',
          status: 'status.IN_PROGRESS',
          filing: 'filing.REQUIRED',
        },
      },
    ],
  },
];

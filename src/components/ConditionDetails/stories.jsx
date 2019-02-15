import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import ConditionDetails from '.';
import ReadMe from './README.md';

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

const data = [
  {
    instrumentNumber: 'XO-001-2018',
    issuanceDate: '2014-10-24',
    effectiveDate: '2014-10-24',
    sunsetDate: '2019-01-30',
    status: 'status.inProgress',
    location: 'Albuquerque, NM',
    type: 'Construction of Oil Pipeline',
    activity: lorem,
    conditions: [
      {
        length: 3,
        fill: 'pink',
        keywords: ['program'],
        text: lorem,
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
        text: lorem,
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
    activity: lorem,
    conditions: [
      {
        length: 1,
        fill: 'red',
        keywords: ['program'],
        text: lorem,
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
        text: lorem,
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
    activity: lorem,
    conditions: [
      {
        length: 3,
        fill: 'orange',
        keywords: ['program'],
        text: lorem,
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

const updateSelectedItem = () => (instrumentIndex, itemIndex) => (
  { selectedItem: { instrumentIndex, itemIndex } }
);

const toggleExpanded = () => expand => ({ expanded: expand });

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  selectedItem: { instrumentIndex: 1, itemIndex: -1 },
  openProjectDetails: project => alert(`Project details for: ${project}`),
  openIntermediatePopup: instrumentNumber => alert(`Intermediate popup for: ${instrumentNumber}`),
};

storiesForComponent('Components|ConditionDetails', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['updateSelectedItem', 'toggleExpanded'] }))
  .add('default', () => (
    <ConditionDetails
      {...defaultProps}
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { toggleExpanded, updateSelectedItem } } })
  .add('expandable', () => (
    <ConditionDetails
      {...defaultProps}
      selectedItem={{ instrumentIndex: 1, itemIndex: 0 }}
      isExpandable
      expanded
      {...getInteractionProps()}
    />
  ), { interaction: { actions: { toggleExpanded, updateSelectedItem } } });

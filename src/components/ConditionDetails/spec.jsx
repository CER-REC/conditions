import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import ConditionDetails from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

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

const defaultProps = {
  data,
  selectedProject: 'Keystone XL',
  searchKeywords: {
    include: ['hello'],
  },
  selectedItem: { instrumentIndex: 1, itemIndex: -1 },
};

describe('Components|ConditionDetails', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;

    beforeEach(() => {
      spy = {
        openProjectDetails: jest.fn(),
        openIntermediatePopup: jest.fn(),
        toggleExpanded: jest.fn(),
        updateSelectedItem: jest.fn(),
      };

      wrapper = shallow(
        <ConditionDetails
          {...defaultProps}
          isExpandable
          openProjectDetails={spy.openProjectDetails}
          openIntermediatePopup={spy.openIntermediatePopup}
          toggleExpanded={spy.toggleExpanded}
          updateSelectedItem={spy.updateSelectedItem}
        />,
      );
    });

    shouldBehaveLikeAComponent(ConditionDetails, () => wrapper);

    test('should call its openProjectDetails callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.header')
        .find('.openProject')
        .simulate('click', eventFuncs);
      expect(spy.openProjectDetails).toHaveBeenCalledTimes(1);
    });

    test('should call its openIntermediatePopup callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.content')
        .find('.instrumentLink')
        .simulate('click', eventFuncs);
      expect(spy.openIntermediatePopup).toHaveBeenCalledTimes(1);
    });

    test('should call its toggleExpanded callback', () => {
      wrapper.find('.ConditionDetails')
        .find('.header')
        .find('.toggleExpand')
        .simulate('click', eventFuncs);
      expect(spy.toggleExpanded).toHaveBeenCalledTimes(1);
    });
  });
});

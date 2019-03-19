import React from 'react';
import { shallow } from 'enzyme';
import ProjectMenu from '.';
import * as testData from './mockSpecData';

const projectsData = [
  {
    id: 1226,
    name: {
      english: 'Trans-Alta Limited-44245',
      french: 'nameInfr',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInfr',
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
      french: 'nameInfr',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInfr',
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
      french: 'nameInfr',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInfr',
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
      french: 'nameInfr',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInfr',
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
      french: 'nameInfr',
    },
    shortName: {
      english: 'Trans-Alta',
      french: 'nameInfr',
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

describe('Components|ProjectMenu', () => {
  // Assuming that the actual graph data will have a filter coming from the view level
  // graph data being the subset of data filtered by the <FeaturedMenu /> state
  // Project name will be in either french or english depending on view state

  const selectedProjectID = 1228;
  const noop = () => {};
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectsData={projectsData}
        selectedProjectID={selectedProjectID}
        onChange={noop}
        selectedFeature="theme"
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a ProjectMenu class', () => {
      expect(wrapper.is('.ProjectMenu')).toBe(true);
    });

    test('should contain 1 List component', () => {
      expect(wrapper.find('List')).toHaveLength(1);
    });

    test('should pass an array of projects to the List', () => {
      const list = wrapper.find('List');
      expect(Array.isArray(list.props().items)).toBe(true);
    });

    test('should pass down a maximum of 5 projects to the List', () => {
      const list = wrapper.find('List');
      // passed props
      expect(list.props().items).toHaveLength(5);
      // rendered output
      expect(list.shallow().find('ProjectChart')).toHaveLength(5);
    });

    test('should pass the List the index of the selected project', () => {
      expect(wrapper.find('List').props().selected).toBe(2);
    });

    test('should pass down an onChange function to the List', () => {
      const list = wrapper.find('List');
      expect(typeof list.props().onChange).toBe('function');
    });

    test('should have double margins for single project', () => {
      const onChange = jest.fn();
      wrapper = shallow(
        <ProjectMenu
          projectsData={testData.data}
          selectedProjectID={testData.data[0].id}
          onChange={onChange}
          selectedFeature="theme"
        />,
      );
      const two = 2;
      expect(wrapper.find('.ProjectMenu').hasClass(`paddingBefore${two}`)).toEqual(true);
    });
  });
  const testProjectsArraySize = (expectedResults, dataSet) => {
    for (let i = 0; i < expectedResults.length; i += 1) {
      const [input, output] = expectedResults[i];
      // eslint-disable-next-line no-loop-func
      describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
        let onChange;
        let wrapper;
        beforeEach(() => {
          onChange = jest.fn();
          wrapper = shallow(
            <ProjectMenu
              projectsData={dataSet.slice(0, input.total)}
              selectedProjectID={dataSet[input.selected].id}
              onChange={onChange}
              selectedFeature="theme"
            />,
          );
        });
        test('should have margins before', () => {
          expect(wrapper.find('.ProjectMenu').hasClass(`paddingBefore${output.before}`)).toEqual(true);
        });
        test('should have margins after', () => {
          expect(wrapper.find('.ProjectMenu').hasClass(`paddingAfter${output.after}`)).toEqual(true);
        });
        test(`should pass the List ${output.total} projects`, () => {
          expect(wrapper.find('List').props().items).toHaveLength(output.total);
        });
        test(`should pass the List a selected project index of ${output.selected}`, () => {
          expect(wrapper.find('List').props().selected).toBe(output.selected);
        });
        test(`should pass ${output.projectID} when List has a selected index of ${input.clickedIndex}`, () => {
          wrapper.find('List').props().onChange(input.clickedIndex);
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenLastCalledWith(output.projectID);
        });
      });
    }
  };
  testProjectsArraySize(testData.expectedResults8, testData.data);
  testProjectsArraySize(testData.expectedResults5, testData.data);
  testProjectsArraySize(testData.expectedResults4, testData.data);
  testProjectsArraySize(testData.expectedResults3, testData.data);
  testProjectsArraySize(testData.expectedResults2, testData.data);
  testProjectsArraySize(testData.expectedResults1, testData.data);
});

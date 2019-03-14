import React from 'react';
import { shallow } from 'enzyme';
import ProjectMenu from '.';

const projectsData = [
  {
    id: 1226,
    name: {
      en: 'Trans-Alta Limited-44245',
      fr: 'nameInfr',
    },
    shortName: {
      en: 'Trans-Alta',
      fr: 'nameInfr',
    },
    graphData: {
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
      en: 'Trans-Alta Limited-44245',
      fr: 'nameInfr',
    },
    shortName: {
      en: 'Trans-Alta',
      fr: 'nameInfr',
    },
    graphData: {
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
      en: 'Trans-Alta Limited-44245',
      fr: 'nameInfr',
    },
    shortName: {
      en: 'Trans-Alta',
      fr: 'nameInfr',
    },
    graphData: {
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
      en: 'Trans-Alta Limited-44245',
      fr: 'nameInfr',
    },
    shortName: {
      en: 'Trans-Alta',
      fr: 'nameInfr',
    },
    graphData: {
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
      en: 'Trans-Alta Limited-44245',
      fr: 'nameInfr',
    },
    shortName: {
      en: 'Trans-Alta',
      fr: 'nameInfr',
    },
    graphData: {
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
  // Project name will be in either fr or en depending on view state

  const selectedProjectID = 1227;
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
      expect(list.props().items).toHaveLength(4);
      // rendered output
      expect(list.shallow().find('ProjectChart')).toHaveLength(4);
    });

    test('should pass the List the index of the selected project', () => {
      expect(wrapper.find('List').props().selected).toBe(1);
    });

    test('should pass down an onChange function to the List', () => {
      const list = wrapper.find('List');
      expect(typeof list.props().onChange).toBe('function');
    });
  });

  // expectedResults is the input coming into the project menu
  // and the output to the list component
  // [0] input, [1] output
  // if 0 should have 3 items, 1

  const expectedResults8 = [
    [{ total: 8, selected: 0, clickedIndex: 2 }, { total: 3, selected: 0, projectID: 1225 }],
    [{ total: 8, selected: 1, clickedIndex: 3 }, { total: 4, selected: 1, projectID: 1226 }],
    [{ total: 8, selected: 2, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1227 }],
    [{ total: 8, selected: 3, clickedIndex: 1 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 4, clickedIndex: 0 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 5, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1230 }],
    [{ total: 8, selected: 6, clickedIndex: 1 }, { total: 4, selected: 2, projectID: 1228 }],
    [{ total: 8, selected: 7, clickedIndex: 0 }, { total: 3, selected: 2, projectID: 1228 }],
    [{ total: 4, selected: 1, clickedIndex: 1 }, { total: 4, selected: 1, projectID: 1224 }],
  ];

  const dataSetOf8 = [
    { id: 1223, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1224, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1225, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1226, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1227, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1228, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1229, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1230, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  ];

  for (let i = 0; i < expectedResults8.length; i += 1) {
    const [input, output] = expectedResults8[i];
    // eslint-disable-next-line no-loop-func
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let onChange;
      let wrapper;
      beforeEach(() => {
        onChange = jest.fn();
        wrapper = shallow(
          <ProjectMenu
            projectsData={dataSetOf8}
            selectedProjectID={dataSetOf8[input.selected].id}
            onChange={onChange}
            selectedFeature="theme"
          />,
        );
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

  const expectedResults4 = [
    [{ total: 4, selected: 0, clickedIndex: 2 }, { total: 3, selected: 0, projectID: 1225 }],
    [{ total: 4, selected: 1, clickedIndex: 3 }, { total: 4, selected: 1, projectID: 1226 }],
    [{ total: 4, selected: 2, clickedIndex: 3 }, { total: 4, selected: 2, projectID: 1226 }],
    [{ total: 4, selected: 3, clickedIndex: 1 }, { total: 3, selected: 2, projectID: 1225 }],
  ];

  const dataSetOf4 = [
    { id: 1223, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1224, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1225, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1226, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  ];

  for (let i = 0; i < expectedResults4.length; i += 1) {
    const [input, output] = expectedResults4[i];
    // eslint-disable-next-line no-loop-func
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let onChange;
      let wrapper;
      beforeEach(() => {
        onChange = jest.fn();
        wrapper = shallow(
          <ProjectMenu
            projectsData={dataSetOf4}
            selectedProjectID={dataSetOf4[input.selected].id}
            onChange={onChange}
            selectedFeature="theme"
          />,
        );
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

  const expectedResults3 = [
    [{ total: 3, selected: 0, clickedIndex: 2 }, { total: 3, selected: 0, projectID: 1225 }],
    [{ total: 3, selected: 1, clickedIndex: 1 }, { total: 3, selected: 1, projectID: 1224 }],
    [{ total: 3, selected: 2, clickedIndex: 0 }, { total: 3, selected: 2, projectID: 1223 }],
  ];

  const dataSetOf3 = [
    { id: 1223, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1224, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
    { id: 1225, name: { en: 'Trans-Alta Limited-44245' }, graphData: { theme: { A: 10 } } },
  ];

  for (let i = 0; i < expectedResults3.length; i += 1) {
    const [input, output] = expectedResults3[i];
    // eslint-disable-next-line no-loop-func
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let onChange;
      let wrapper;
      beforeEach(() => {
        onChange = jest.fn();
        wrapper = shallow(
          <ProjectMenu
            projectsData={dataSetOf3}
            selectedProjectID={dataSetOf3[input.selected].id}
            onChange={onChange}
            selectedFeature="theme"
          />,
        );
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
});

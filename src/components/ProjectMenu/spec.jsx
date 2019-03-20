import React from 'react';
import { shallow } from 'enzyme';
import ProjectMenu from '.';

const testData = [
  {
    id: 100,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 101,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 102,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 103,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 104,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 105,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 106,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
  {
    id: 107,
    name: { en: 'Trans-Alta Limited-44245', fr: '' },
    shortName: { en: '', fr: '' },
    data: {
      theme: { ADMINISTRATIVE: 10, DAMAGE_PREVENTION: 0 },
      instrument: {},
      phase: {},
      status: {},
      type: {},
      filing: {},
    },
  },
];

describe('Components|ProjectMenu', () => {
  const selectedProjectID = 105;
  const noop = () => {};
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectsData={testData}
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
  });

  // Outer key is the number of items in the source list
  // Inner key is the menu index that is selected
  //
  // 8: { 0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 } }
  // with 8 items
  //   and project at index 0 selected
  //     should show 3 projects
  //     should have padding of 2 before and 0 after
  //     should pass the List a selected index of 0
  //     clicking list index 0 should emit project ID 100
  //     clicking list index 1 should emit project ID 101
  //     clicking list index 2 should emit project ID 102
  const groupedTestCases = {
    8: {
      0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 },
      1: { listIndex: 1, before: 1, items: [100, 101, 102, 103], after: 0 },
      2: { listIndex: 2, before: 0, items: [100, 101, 102, 103, 104], after: 0 },
      3: { listIndex: 2, before: 0, items: [101, 102, 103, 104, 105], after: 0 },
      4: { listIndex: 2, before: 0, items: [102, 103, 104, 105, 106], after: 0 },
      5: { listIndex: 2, before: 0, items: [103, 104, 105, 106, 107], after: 0 },
      6: { listIndex: 2, before: 0, items: [104, 105, 106, 107], after: 1 },
      7: { listIndex: 2, before: 0, items: [105, 106, 107], after: 2 },
    },
    5: {
      0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 },
      1: { listIndex: 1, before: 1, items: [100, 101, 102, 103], after: 0 },
      2: { listIndex: 2, before: 0, items: [100, 101, 102, 103, 104], after: 0 },
      3: { listIndex: 2, before: 0, items: [101, 102, 103, 104], after: 1 },
      4: { listIndex: 2, before: 0, items: [102, 103, 104], after: 2 },
    },
    4: {
      0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 },
      1: { listIndex: 1, before: 1, items: [100, 101, 102, 103], after: 0 },
      2: { listIndex: 2, before: 0, items: [100, 101, 102, 103], after: 1 },
      3: { listIndex: 2, before: 0, items: [101, 102, 103], after: 2 },
    },
    3: {
      0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 },
      1: { listIndex: 1, before: 1, items: [100, 101, 102], after: 1 },
      2: { listIndex: 2, before: 0, items: [100, 101, 102], after: 2 },
    },
    2: {
      0: { listIndex: 0, before: 2, items: [100, 101], after: 1 },
      1: { listIndex: 1, before: 1, items: [100, 101], after: 2 },
    },
    1: {
      0: { listIndex: 0, before: 2, items: [100], after: 2 },
    },
  };

  describe.each(Object.entries(groupedTestCases))(
    'with %d items as input',
    (inputTotal, testCases) => describe.each(Object.entries(testCases))(
      'and project at index %d selected',
      (menuIndex, { listIndex, before, items, after }) => {
        let onChange;
        let wrapper;
        beforeEach(() => {
          onChange = jest.fn();
          wrapper = shallow(
            <ProjectMenu
              projectsData={testData.slice(0, inputTotal)}
              selectedProjectID={testData[menuIndex].id}
              onChange={onChange}
              selectedFeature="theme"
            />,
          );
        });

        test(`should show ${items.length} projects`, () => {
          expect(wrapper.find('List').props().items).toHaveLength(items.length);
        });

        test(`should have padding of ${before} before and ${after} after`, () => {
          const projectMenu = wrapper.find('.ProjectMenu');
          const classNames = projectMenu.prop('className').split(' ');
          expect(classNames).toContain(`paddingBefore${before}`);
          expect(classNames).toContain(`paddingAfter${after}`);
        });

        test(`should pass the List a selected project index of ${listIndex}`, () => {
          expect(wrapper.find('List').props().selected).toBe(listIndex);
        });

        // Turn IDs into [index, ID] tuples
        test.each(items.map((v, i) => ([i, v])))(
          'clicking list index %d should emit project ID %d',
          (index, projectID) => {
            wrapper.find('List').props().onChange(index);
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenLastCalledWith(projectID);
          },
        );
      },
    ),
  );
});

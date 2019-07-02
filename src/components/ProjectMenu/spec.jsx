import React from 'react';
import { shallow } from 'enzyme';
import ProjectMenu from '.';
import ProjectChart from './ProjectChart';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import { loadingProjectsData, displayOrder } from '../../mockData';

const testData = [
  {
    id: 100,
    name: 'name-100',
    shortName: 'shortName-100',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-101',
    shortName: 'shortName-101',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-102',
    shortName: 'shortName-102',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-103',
    shortName: 'shortName-103',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-104',
    shortName: 'shortName-104',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-105',
    shortName: 'shortName-105',
    numberOfConditions: 10,
    aggregatedCount: {
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
    name: 'name-106',
    shortName: 'shortName-106',
    numberOfConditions: 10,
    aggregatedCount: {
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
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectsData={testData}
        selectedProjectID={105}
        onChange={() => {}}
        selectedFeature="theme"
        displayOrder={displayOrder}
      />);
    });

    shouldBehaveLikeAComponent(ProjectMenu, () => wrapper);

    test('should pass an array of projects to the List', () => {
      const list = wrapper.find('List');
      expect(list).toHaveLength(1);
      expect(Array.isArray(list.props().items)).toBe(true);
    });
  });

  describe('with loading data', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectsData={Array(5).fill(loadingProjectsData).map((v, id) => ({ ...v, id }))}
        selectedProjectID={0}
        onChange={() => {}}
        selectedFeature="theme"
        displayOrder={displayOrder}
        loading
      />);
    });

    test('should add a loading class onto ProjectMenu', () => {
      const list = wrapper.find('List');
      expect(list).toHaveLength(1);
      expect(wrapper.hasClass('loading')).toBe(true);
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
    7: {
      0: { listIndex: 0, before: 2, items: [100, 101, 102], after: 0 },
      1: { listIndex: 1, before: 1, items: [100, 101, 102, 103], after: 0 },
      2: { listIndex: 2, before: 0, items: [100, 101, 102, 103, 104], after: 0 },
      3: { listIndex: 2, before: 0, items: [101, 102, 103, 104, 105], after: 0 },
      4: { listIndex: 2, before: 0, items: [102, 103, 104, 105, 106], after: 0 },
      5: { listIndex: 2, before: 0, items: [103, 104, 105, 106], after: 1 },
      6: { listIndex: 2, before: 0, items: [104, 105, 106], after: 2 },
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
              displayOrder={displayOrder}
            />,
          );
        });

        test(`should show ${items.length} projects`, () => {
          const listItems = wrapper.find('List').prop('items');
          expect(listItems).toHaveLength(items.length);
          listItems.forEach(item => expect(item.type).toBe(ProjectChart));
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

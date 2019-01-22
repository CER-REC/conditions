import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ProjectMenu from '.';

describe('Components|ProjectMenu', () => {
  // Assuming that the actual graph data will have a filter coming from the view level
  // graph data being the subset of data filtered by the <FeaturedMenu /> state
  // Project name will be in either french or english depending on view state
  const projectData = [
    {
      id: 1223,
      name: 'Project Name 1',
      graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
    },
    {
      id: 1224,
      name: 'Project Name 2',
      graphData: [{ name: 'security', count: 10, color: 'pink' }, { name: 'managementSystem', count: 19, color: 'green' }],
    },
    {
      id: 1225,
      name: 'Project Name 3',
      graphData: [{ name: 'security', count: 4, color: 'pink' }, { name: 'managementSystem', count: 29, color: 'green' }],
    },
    {
      id: 1226,
      name: 'Project Name 4',
      graphData: [{ name: 'security', count: 6, color: 'pink' }, { name: 'managementSystem', count: 22, color: 'green' }],
    },
    {
      id: 1227,
      name: 'Project Name 5',
      graphData: [{ name: 'security', count: 5, color: 'pink' }, { name: 'managementSystem', count: 0, color: 'green' }],
    },
    {
      id: 1228,
      name: 'Project Name 6',
      graphData: [{ name: 'security', count: 10, color: 'pink' }, { name: 'managementSystem', count: 19, color: 'green' }],
    },
    {
      id: 1229,
      name: 'Project Name 7',
      graphData: [{ name: 'security', count: 4, color: 'pink' }, { name: 'managementSystem', count: 29, color: 'green' }],
    },
    {
      id: 1230,
      name: 'Project Name 8',
      graphData: [{ name: 'security', count: 6, color: 'pink' }, { name: 'managementSystem', count: 22, color: 'green' }],
    },
  ];

  const selectedProjectID = 1226;
  const noop = () => {};
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectData={projectData}
        selectedProjectID={selectedProjectID}
        onChange={noop}
        selectedFeature="Phase"
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

  // expectedResults is the input coming into the project menu
  // and the output to the list component
  // [0] input, [1] output
  const expectedResults = [
    [{ total: 8, selected: 0, clickedIndex: 2 }, { total: 3, selected: 0, projectID: 1225 }],
    [{ total: 8, selected: 1, clickedIndex: 3 }, { total: 4, selected: 1, projectID: 1226 }],
    [{ total: 8, selected: 2, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1227 }],
    [{ total: 8, selected: 3, clickedIndex: 1 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 4, clickedIndex: 0 }, { total: 5, selected: 2, projectID: 1225 }],
    [{ total: 8, selected: 5, clickedIndex: 4 }, { total: 5, selected: 2, projectID: 1230 }],
    [{ total: 8, selected: 6, clickedIndex: 1 }, { total: 4, selected: 2, projectID: 1228 }],
    [{ total: 8, selected: 7, clickedIndex: 0 }, { total: 3, selected: 2, projectID: 1228 }],
    [{ total: 3, selected: 2, clickedIndex: 1 }, { total: 3, selected: 2, projectID: 1224 }],
    [{ total: 3, selected: 1, clickedIndex: 2 }, { total: 3, selected: 1, projectID: 1225 }],
    [{ total: 4, selected: 1, clickedIndex: 1 }, { total: 4, selected: 1, projectID: 1224 }],
    [{ total: 6, selected: 5, clickedIndex: 2 }, { total: 3, selected: 2, projectID: 1228 }],
  ];

  for (let i = 0; i < expectedResults.length; i += 1) {
    const [input, output] = expectedResults[i];
    describe(`with index ${input.selected} selected of ${input.total} projects`, () => {
      let onChange;
      let wrapper;
      beforeEach(() => {
        onChange = sinon.spy();
        wrapper = shallow(<ProjectMenu
          projectData={projectData.slice(0, input.total)}
          selectedProjectID={projectData[input.selected].id}
          onChange={onChange}
          selectedFeature="theme"
        />);
      });

      test(`should pass the List ${output.total} projects`, () => {
        expect(wrapper.find('List').props().items).toHaveLength(output.total);
      });

      test(`should pass the List a selected project index of ${output.selected}`, () => {
        expect(wrapper.find('List').props().selected).toBe(output.selected);
      });

      test(`should pass ${output.projectID} when List has a selected index of ${input.clickedIndex}`, () => {
        wrapper.find('List').props().onChange(input.clickedIndex);
        expect(onChange.calledOnce).toBe(true);
        expect(onChange.firstCall.args).toEqual([output.projectID]);
      });
    });
  }
});

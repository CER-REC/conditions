import React from 'react';
import { shallow } from 'enzyme';
import ProjectMenu from '.';
import * as testData from './specMockData';

describe('Components|ProjectMenu', () => {
  const selectedProjectID = 1228;
  const noop = () => {};
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProjectMenu
        projectsData={testData.data}
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

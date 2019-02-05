import React from 'react';
import { shallow } from 'enzyme';
import FilterContent from '.';

const yearRange = {
  start: 70,
  end: 80,
};
const projectStatus = ['OPEN', 'CLOSED', 'CANCELLED'];
const noop = () => {};
describe('Components|SearchBar/FilterContent', () => {
  describe('if display prop is false', () => {
    test('should not render anything', () => {
      const wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display={false}
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
        />,
      );
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('proper props being passed in', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
        />,
      );
    });
    test('renders a className of FilterContent', () => {
      expect(wrapper.find('.FilterContent')).toHaveLength(1);
    });
    test('renders ul with className of filter', () => {
      expect(wrapper.find('ul.filter')).toHaveLength(1);
    });
    test('renders ul with className of projectList', () => {
      expect(wrapper.find('ul.projectList')).toHaveLength(1);
    });

    test('renders formattedMessage reset', () => {
      const updatedWrapper = wrapper.find('div.reset > FormattedMessage');
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.reset');
      expect(updatedWrapper.shallowWithIntl().text()).toBe('RESET');
    });

    test('renders formattedMessage projectYear', () => {
      const updatedWrapper = wrapper.find('.titleText > FormattedMessage').first();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.filter.projectYear');
    });

    test('renders projectStatus Text', () => {
      const updatedWrapper = wrapper.find('.titleText > FormattedMessage').last();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.filter.projectStatus');
    });

    test('renders close text', () => {
      const updatedWrapper = wrapper.find('FormattedMessage').last();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.close');
      expect(updatedWrapper.shallowWithIntl().hasClass('close')).toBe(true);
    });
  });
});

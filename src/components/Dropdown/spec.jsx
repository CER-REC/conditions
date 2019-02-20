import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '.';

describe('Components|Dropdown', () => {
  let spy;
  let wrapper;
  let options;
  let optionID;

  describe('with default props', () => {
    beforeEach(() => {
      spy = jest.fn();
      options = ['theme', 'type'];
      optionID = 'common.features';
      wrapper = shallow(
        <Dropdown
          options={options}
          onChange={spy}
          selectedOption={options[0]}
          optionID={optionID}
        />,
      );
    });

    test('should render the options in the select drop down', () => {
      const optionsWrapper = wrapper.find('select FormattedMessage');
      expect(optionsWrapper).toHaveLength(options.length);
      options.forEach((feature, index) => {
        expect(optionsWrapper.at(index).prop('id')).toBe(`${optionID}.${feature}`);
        expect(optionsWrapper.at(index).shallowWithIntl().is('option')).toBe(true);
      });
    });

    test('should render the select drop down with the first item selected', () => {
      expect(wrapper.find('select').prop('value')).toBe(options[0]);
    });

    test('should not render any select option with a selected attribute', () => {
      const optionsWrapper = wrapper.find('option');

      for (let i = 0; i < optionsWrapper.length; i += 1) {
        expect(optionsWrapper.at(i).prop('selected')).toBeUndefined();
      }
    });

    test('should call the onChange function with the feature on drop down item change', () => {
      options.forEach((feature) => {
        wrapper.find('select').simulate('change', { target: { value: feature } });
        expect(spy).toHaveBeenLastCalledWith(feature);
      });
      expect(spy).toHaveBeenCalledTimes(options.length);
    });

    test('should render the select drop down with the corresponding item selected when selected is provided', () => {
      const selectedIndex = 1;
      wrapper = shallow((
        <Dropdown
          options={options}
          onChange={spy}
          selectedOption={options[selectedIndex]}
          optionID={optionID}
        />
      ));

      expect(wrapper.find('select').prop('value')).toBe(options[selectedIndex]);
    });

    test('should render the select drop down with the first item selected when selected value is invalid', () => {
      wrapper = shallow((
        <Dropdown
          options={options}
          onChange={spy}
          selectedOption=" "
          optionID={optionID}
        />
      ));

      expect(wrapper.find('select').prop('value')).toBe(options[0]);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import './styles.scss';

import Ring from '.';

describe('Components|Wheel/Ring', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="Company" />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('g');
    });

    test('should render a company wheel ring group', () => {
      expect(wrapper.find('.WheelRing').type()).toBe('g');
    });

    test('should have an outer and an inner ring in the ring group', () => {
      expect(wrapper.find('.RingGroup').children()).toHaveLength(2);
    });

    test('should render a ring group containing the outer outlines for the ring', () => {
      expect(wrapper.find('.RingGroup').type()).toBe('g');
    });

    test('should have a class company for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('Company')).toBe(true);
    });

    test('should render 18 lines inside a lines group', () => {
      expect(wrapper.find('.Lines').children()).toHaveLength(18);
    });

    test('should have a class company for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('Company')).toBe(true);
    });
  });

  describe('with location props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="Location" />);
    });

    test('should have a class Location for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('Location')).toBe(true);
    });

    test('should have a class location for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('Location')).toBe(true);
    });
  });
});


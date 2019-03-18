import React from 'react';
import { shallow } from 'enzyme';
import './styles.scss';

import Ring from '.';

describe('Components|Wheel/Ring', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="company" />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('g');
    });

    test('should render a company wheel ring group', () => {
      expect(wrapper.find('.Ring').type()).toBe('g');
    });

    test('should have an outer and an inner ring in the ring group', () => {
      expect(wrapper.find('.RingGroup').children()).toHaveLength(2);
    });

    test('should render a ring group containing the outer outlines for the ring', () => {
      expect(wrapper.find('.RingGroup').type()).toBe('g');
    });

    test('should have a class company for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('company')).toBe(true);
    });

    test('should render 36 lines inside a lines group', () => {
      expect(wrapper.find('.Lines').children()).toHaveLength(36);
    });

    test('should have a class company for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('company')).toBe(true);
    });
  });

  describe('with location props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="location" />);
    });

    test('should have a class location for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('location')).toBe(true);
    });

    test('should have a class location for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('location')).toBe(true);
    });
  });
});


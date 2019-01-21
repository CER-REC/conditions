import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import './styles.scss';

import Ring from '.';

describe('Components|Wheel/Ring', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="Company" />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('g');
    });

    it('should have an outer and an inner ring in the ring group', () => {
      expect(wrapper.find('.RingGroup').children()).to.have.length(2);
    });

    it('should render a ring group containing the outer outlines for the ring', () => {
      expect(wrapper.find('.RingGroup').type()).to.equal('g');
    });

    it('should have a class company for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('Company')).to.equal(true);
    });

    it('should render 18 lines inside a lines group', () => {
      expect(wrapper.find('.Lines').children()).to.have.length(18);
    });

    it('should have a class company for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('Company')).to.equal(true);
    });
  });

  describe('with location props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="WheelContainer" ringType="Location" />);
    });

    it('should have a class Location for the ring background ', () => {
      expect(wrapper.find('.RingBackground').hasClass('Location')).to.equal(true);
    });

    it('should have a class location for the line background ', () => {
      expect(wrapper.find('.LineBackground').first().hasClass('Location')).to.equal(true);
    });
  });
});


import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import './styles.scss';

import Ring from './';

describe('Components|CompanyWheel/Ring', () => {
  describe('without any items', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<Ring />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="wheelContainer" ringType="normal" />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('g');
    });

    it('should render a company wheel ring group', () => {
      expect(wrapper.find('#companywheelring').type()).to.equal('g');
    });

    it('should have an outer and an inner ring in the ring group', () => {
      expect(wrapper.find('#ringgroup').children()).to.have.length(2);
    });

    it('should render a ring group containing the outer outlines for the ring', () => {
      expect(wrapper.find('#ringgroup').type()).to.equal('g');
    });

    it('should have a class normal for the ring background ', () => {
      expect(wrapper.find('#ringbackground').hasClass('normal')).to.equal(true);
    });

    it('should render 18 lines inside a lines group', () => {
      expect(wrapper.find('#lines').children()).to.have.length(18);
    });

    it('should have a class normal for the line background ', () => {
      expect(wrapper.find('.linebackground').first().hasClass('normal')).to.equal(true);
    });
  });

  describe('with location props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Ring className="wheelContainer" ringType="location" />);
    });

    it('should have a class location for the ring background ', () => {
      expect(wrapper.find('#ringbackground').hasClass('location')).to.equal(true);
    });

    it('should have a class location for the line background ', () => {
      expect(wrapper.find('.linebackground').first().hasClass('location')).to.equal(true);
    });
  });
});


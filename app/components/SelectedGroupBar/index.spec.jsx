import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SelectedGroupBar from './';

describe('Components|SelectedGroupBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SelectedGroupBar />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a SelectedGroupBar class', () => {
      expect(wrapper.is('.SelectedGroupBar')).to.equal(true);
    });

    it('should have a child element to render the group and group-item', () => {
      expect(wrapper.find('.SelectedGroupBar').children()).to.have.lengthOf(1);
    });
  });
  describe('with default props', () => {
    it('should accept a prop for the group text', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" />);
      expect(wrapper.find('span').first().props().children).to.equal('Conditions : ');
    });

    it('should accept a prop for the groupitem text', () => {
      const wrapper = shallow(<SelectedGroupBar groupItem="condition" />);
      expect(wrapper.find('span').last().props().children).to.equal('condition');
    });

    it('should accept both props for the group and groupitem text', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItem="condition" />);
      expect(wrapper.find('span').first().props().children).to.equal('Conditions : ');
      expect(wrapper.find('span').last().props().children).to.equal('condition');
    });

    it('should accept a prop for the background color', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItem="condition" color="tomato" />);
      expect(wrapper.props().color).to.equal('tomato');
    });

    it('should accept a prop to set the group text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItem="condition" groupSize="32px" />);
      expect(wrapper.find('span').first().props().style.fontSize).to.equal('32px');
    });

    it('should accept a prop to set the groupitem text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItem="condition" groupItemSize="14px" groupSize="20px" />);
      expect(wrapper.find('span').first().props().style.fontSize).to.equal('20px');
      expect(wrapper.find('span').last().props().style.fontSize).to.equal('14px');
    });
  });
});


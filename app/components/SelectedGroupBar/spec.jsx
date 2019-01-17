import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SelectedGroupBar from '.';

describe('Components|SelectedGroupBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SelectedGroupBar group="components.companyWheel.wheelRay.title">Company Name</SelectedGroupBar>);
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
    it('should accept both props for the group and groupItem text', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions">condition</SelectedGroupBar>);
      expect(wrapper.find('FormattedMessage')).to.have.lengthOf(1);
      expect(wrapper.find('span').last().text()).to.equal('condition');
    });

    it('should accept a prop for the background color', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" backgroundColor="tomato">condition</SelectedGroupBar>);
      expect(wrapper.find('p').props().style.background).to.equal('tomato');
    });

    it('should accept a prop to set the group text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupSize="32px">condition</SelectedGroupBar>);
      expect(wrapper.children().first().props().style.fontSize).to.equal('32px');
    });

    it('should accept a prop to set the groupitem text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupItemSize="14px" groupSize="20px">condition</SelectedGroupBar>);
      expect(wrapper.children().first().props().style.fontSize).to.equal('20px');
      expect(wrapper.find('span').first().props().style.fontSize).to.equal('14px');
    });
  });
});


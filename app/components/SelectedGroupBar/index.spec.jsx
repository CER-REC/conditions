import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
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
      expect(wrapper.find('p').props().children).to.equal('Conditions : undefined');
    });

    it('should accept a prop for the groupitem text', () => {
      const wrapper = shallow(<SelectedGroupBar groupitem="condition" />);
      expect(wrapper.find('p').props().children).to.equal('undefined : condition');
    });

    it('should accept both props for the group and groupitem text', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupitem="condition" />);
      expect(wrapper.find('p').props().children).to.equal('Conditions : condition');
    });

    it('should accept a prop for the background color', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupitem="condition" color="tomato" />);
      expect(wrapper.props().color).to.equal('tomato');
    });

    it('should accept a prop to set the group text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupitem="condition" groupsize="16px" />);
      expect(wrapper.props().groupsize).to.equal('16px');
    });

    it('should accept a prop to set the groupitem text size', () => {
      const wrapper = shallow(<SelectedGroupBar group="Conditions" groupitem="condition" groupitemsize="14px" groupsize="16px" />);
      expect(wrapper.props().groupitemsize).to.equal('14px');
      expect(wrapper.props().groupsize).to.equal('16px');
    });
  });
});


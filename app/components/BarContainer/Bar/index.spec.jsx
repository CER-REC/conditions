import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Bar from '.';

describe('Components|BarContainer/Bar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Bar width={0} height={0} x={0} y={0} fill="" />);
    });

    it('should render a rect', () => {
      expect(wrapper.type()).to.equal('rect');
    });

    it('should have an Bar class', () => {
      expect(wrapper.is('.Bar')).to.equal(true);
    });

    it('should accept a width', () => {
      expect(wrapper.props().width).to.equal(0);
      wrapper.setProps({ width: 10 });
      expect(wrapper.props().width).to.equal(10);
    });

    it('should accept a height', () => {
      expect(wrapper.props().height).to.equal(0);
      wrapper.setProps({ height: 10 });
      expect(wrapper.props().height).to.equal(10);
    });

    it('should have a initial x value', () => {
      expect(wrapper.props().x).to.equal(0);
      wrapper.setProps({ x: 10 });
      expect(wrapper.props().x).to.equal(10);
    });

    it('should have a initial y value', () => {
      expect(wrapper.props().y).to.equal(0);
      wrapper.setProps({ y: 10 });
      expect(wrapper.props().y).to.equal(10);
    });

    it('should have a fill color', () => {
      wrapper.setProps({ fill: 'tomato' });
      expect(wrapper.props().fill).to.equal('tomato');
    });
  });
});

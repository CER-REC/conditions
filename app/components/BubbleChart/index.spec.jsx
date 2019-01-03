import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BubbleChart from '.';

const noop = () => {};

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    it('should not render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="test" />);
      expect(wrapper.type()).to.equal(null);
    });
  });
  describe('with a selectedCategory', () => {
    it('should render a div', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" />);
      expect(wrapper.type()).to.equal('div');
    });

    it('should render a bubbleChart class', () => {
      const wrapper = shallow(<BubbleChart selectedCategory="instrument" />);
      expect(wrapper.find('.BubbleChart')).to.have.lengthOf(1);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import BarContainer from '.';

describe('Components|BarContainer', () => {
  describe('with default props', () => {
    const rectItems = [
      {
        value: 12,
        fill: 'tomato',
      },
      {
        value: 99,
        fill: 'blue',
      },
    ];

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BarContainer items={rectItems} size={12} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a BarContainer class', () => {
      expect(wrapper.is('.BarContainer')).to.equal(true);
    });

    it('should be able to render a <g> wrapper', () => {
      wrapper = shallow(<BarContainer standalone items={rectItems} size={12} />);
      expect(wrapper.find('g')).to.have.lengthOf(1);
    });

    it('should have a scale prop', () => {
      expect(wrapper.props().style.height).to.equal(12);
      wrapper.setProps({ scale: 2 });
      expect(wrapper.props().style.height).to.equal(24);
    });

    it('should have a vert prop', () => {
      expect(wrapper.props().style.height).to.equal(12);
      wrapper.setProps({ vert: true });
      expect(wrapper.props().style.height).to.greaterThan(12);
    });
  });
});

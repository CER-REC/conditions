import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import handleInteraction from '../../utilities/handleInteraction';

import IconSelector from './';

describe('Components|IconSelector', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<IconSelector>Test</IconSelector>);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should render the children', () => {
      expect(wrapper.text()).to.equal('Test');
    });

    it('should have an IconSelector class', () => {
      expect(wrapper.is('.IconSelector')).to.equal(true);
    });

    it('should have no background', () => {
      expect(wrapper.props().style.background).to.equal('none');
    });

    it('should have no border', () => {
      expect(wrapper.props().style.background).to.equal('none');
    });

    it('should inherit the text color', () => {
      expect(wrapper.props().style.color).to.equal('inherit');
    });
  });

  describe('with passed props', () => {
    it('should render the "className" prop with the default class and a empty space', () => {
      const wrapper = shallow(<IconSelector>Test</IconSelector>);
      expect(wrapper.props().className).to.equal('IconSelector ');
    });

    it('should render the "IconSelector" class and an extra class through the "className" prop', () => {
      const wrapper = shallow(<IconSelector className="shadowed">Test</IconSelector>);
      expect(wrapper.find('.IconSelector').hasClass('shadowed')).to.equal(true);
    });

    it('shoud accept a size prop with a width and height', () => {
      const wrapper = shallow(<IconSelector size="36px">Test</IconSelector>);
      expect(wrapper.props().style.width).to.equal('36px');
      expect(wrapper.props().style.height).to.equal('36px');
    });

    it('should check that the prop "onClick" by default doesnt exist', () => {
      const wrapper = shallow(<IconSelector>Test</IconSelector>);
      expect(wrapper.props().onClick).to.equal(undefined);
    });

    it('should check the "onClick" prop accepted a function then used the spread operator', () => {
      const wrapper = shallow(<IconSelector onClick={handleInteraction}>Test</IconSelector>);
      expect(wrapper.props().onClick).to.be.a('function');
      expect(wrapper.props().onKeyPress).to.be.a('function');
      expect(wrapper.props().tabIndex).to.equal(0);
      expect(wrapper.props().focusable).to.equal(true);
    });
  });
});


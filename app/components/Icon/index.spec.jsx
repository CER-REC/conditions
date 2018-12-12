import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Icon from './';

describe('Component|Icon', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Icon icon="archive" />);
    });

    it('should render', () => {
      expect(wrapper.find('.Icon')).to.have.lengthOf(1);
    });

    it('should contain a single child of a FontAwesomeIcon element', () => {
      expect(wrapper.find('.Icon').children()).to.have.lengthOf(1);
      expect(wrapper.find('FontAwesomeIcon')).to.have.lengthOf(1);
    });
  });
  describe('with default props', () => {
    it('should accept a prop to override the style', () => {
      const wrapper = shallow(<Icon icon="archive" className="test" />);
      expect(wrapper.find('FontAwesomeIcon').props().className).to.equal('test');
    });

    it('should accept a prop for size', () => {
      const wrapper = shallow(<Icon icon="archive" size="sm" />);
      expect(wrapper.find('FontAwesomeIcon').props().size).to.equal('sm');
    });

    it('should accept a prop for a prefix for brand icons', () => {
      const wrapper = shallow(<Icon icon="google" prefix="fab" />);
      expect(wrapper.find('FontAwesomeIcon').props().icon[0]).to.equal('fab');
      expect(wrapper.find('FontAwesomeIcon').props().icon[1]).to.equal('google');
    });

    it('should accept a prop for color', () => {
      const wrapper = shallow(<Icon icon="archive" color="red" />);
      expect(wrapper.find('FontAwesomeIcon').props().color).to.equal('red');
    });
  });
});

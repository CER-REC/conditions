import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ProjectDot from './';

const wrapperSetup = (propOverrides) => {
  const props = Object.assign({
  }, propOverrides);

  const wrapper = shallow(<ProjectDot {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Components|CompanyWheel/ProjectDot', () => {
  describe('with default props', () => {
    it('should render a circle as a child', () => {
      const { wrapper } = wrapperSetup();
      expect(wrapper.type()).to.equal('circle');
    });

    it('should have a class projectDot always', () => {
      const { wrapper } = wrapperSetup();
      expect(wrapper.hasClass('projectDot')).to.equal(true);
    });
  });

  describe('with changing classes', () => {
    it('should have a defined class passed in as well as a projectDot class', () => {
      const { wrapper } = wrapperSetup({ nameOfCssClass: 'isRelevant' });
      expect(wrapper.hasClass('isRelevant')).to.equal(true);
      expect(wrapper.hasClass('projectDot')).to.equal(true);
    });
  });
});

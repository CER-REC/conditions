import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureDescription from '.';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper elit. Nulla vitae molestie mauris. Nulla placerat ullamcorper quam a ornare. Ut tempor orci sed arcu faucibus, eu mollis turpis lobortis. Vivamus fermentum neque id tincidunt sagittis. Morbi blandit orci eu augue semper pellentesque. Aenean eleifend quis quam id rhoncus. Etiam tristique hendrerit elit, sit amet tempor lacus gravida vitae. Proin viverra erat sed hendrerit convallis.';
const feature = 'Feature title';

describe('Components|FeatureDescription', () => {
  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureDescription description={description} feature={feature} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a feature description class', () => {
      expect(wrapper.is('.feature-description')).to.equal(true);
    });

    it('should have a heading', () => {
      expect(wrapper.find('h1')).to.have.lengthOf(1);
    });
  });
});

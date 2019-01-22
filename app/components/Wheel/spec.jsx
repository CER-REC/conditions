import React from 'react';
import { shallow } from 'enzyme';

import Wheel from '.';

describe('Components|Wheel', () => {
  describe('with no props', () => {
    test('should render a company wheel', () => {
      expect(shallow(<Wheel />).type()).toBe('div');
    });

    // it('should have the prop company by default', () => {
    //   expect(shallow(<CompanyWheel />).prop('ringType')).to.equal('company');
    // });
  });
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Wheel ringType="normal" />);
    });

    test('should render a div', () => {
      expect(wrapper.type()).toBe('div');
    });
  });

  // IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});


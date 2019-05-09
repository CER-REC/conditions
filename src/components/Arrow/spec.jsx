import React from 'react';
import { shallow } from 'enzyme';

import Arrow from '.';

describe('Component|Arrow', () => {
 
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Arrow orientation="Up"/>);
    });

    test('should render', () => {
      expect(wrapper.find('.Arrow')).toHaveLength(1);
    });
  });
  //I need to check that when called with up the line is the line for up
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Arrow orientation="Up"/>);
    });

    test('arrow is up', () => {
      const wrapper = shallow(<Arrow orientation='Up' />);
      expect(wrapper.find('.Arrow').find("line").toBe(" 5.3, 16 11,5 16.7,16 "));
    });
  });
  //when called with down line is line for down

  //when called with right line is line for right

  //when called with left line is line for left
});

import React from 'react';
import { shallow } from 'enzyme';
import GridItem from '.';

describe('Components|Grid/GridItem', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GridItem><></></GridItem>);
    });

    test('should have a class to contain the grid', () => {
      expect(wrapper.is('.item')).toBe(true);
    });
  });
});

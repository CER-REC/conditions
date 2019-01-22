import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import MainInfoBar from '.';

describe('Components|MainInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<MainInfoBar
        onChange={spy}
        handleOnClick={spy}
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.MainInfoBar')).toBe(true);
    });

    test('should show four share icons ', () => {
      expect(wrapper.find('ShareIcon')).toHaveLength(4);
    });

    test('should show a horizontal line', () => {
      expect(wrapper.find('hr')).toHaveLength(1);
    });

    test('should show three text links', () => {
      expect(wrapper.find('button')).toHaveLength(3);
    });
  });
});

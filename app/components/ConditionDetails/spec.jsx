import React from 'react';
import { shallow } from 'enzyme';

import ConditionDetails from '.';

describe('Components|ConditionDetails', () => {
  describe('with default props', () => {
    const items = [
      {
        value: 1,
        fill: ['tomato', 'blue'],
      },
      {
        value: 2,
        fill: ['red', 'green', 'magenta'],
      },
      {
        value: 3,
        fill: ['pink'],
      },
      {
        value: 1,
        fill: ['tomato'],
      },
      {
        value: 2,
        fill: ['red'],
      },
      {
        value: 3,
        fill: ['pink'],
      },
    ];

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ConditionDetails conditions={items} listWidth={256} />);
    });

    test('should render a container', () => {
      expect(wrapper.type()).toBe('section');
    });

    test('should have a List as a child', () => {
      expect(wrapper.find('.List')).toBeTruthy();
    });

    test('should render a Bar with a binned value for each element', () => {
      expect(wrapper.is('.ConditionDetails')).toBe(true);
    });
  });
});

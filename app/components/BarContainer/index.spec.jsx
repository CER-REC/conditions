import React from 'react';
import { shallow } from 'enzyme';

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
      wrapper = shallow(
        <BarContainer
          items={rectItems}
          size={12}
          title="ConditionTitle"
          desc="conditionDesc"
        />,
      );
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('svg');
    });

    test('should render null with items[0]', () => {
      wrapper.setProps({ items: [] });
      expect(wrapper.type()).toBeNull();
    });

    test('should have a BarContainer class', () => {
      expect(wrapper.is('.BarContainer')).toBe(true);
    });

    test('should be able to render a <g> wrapper', () => {
      wrapper = shallow(
        <BarContainer
          title="ConditionTitle"
          desc="conditionDesc"
          standalone
          items={rectItems}
          size={12}
        />,
      );
      expect(wrapper.find('g')).toHaveLength(1);
    });

    test('should have a scale prop', () => {
      expect(wrapper.props().height).toBe(12);
      wrapper.setProps({ scale: 2 });
      expect(wrapper.props().height).toBe(24);
    });

    test('should have a vert prop', () => {
      expect(wrapper.props().height).toBe(12);
      wrapper.setProps({ vert: true });
      expect(wrapper.props().height).toBeGreaterThan(12);
    });
  });
});

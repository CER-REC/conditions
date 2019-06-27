import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import BarContainer from '.';

const rectItems = [
  { feature: 'theme', description: 'STANDARD_CONDITION', value: 10, fill: 'tomato' },
  { feature: 'theme', description: 'INTEGRITY_MANAGEMENT', value: 40, fill: 'blue' },
];

describe('Components|BarContainer', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BarContainer items={rectItems} />);
    });

    shouldBehaveLikeAComponent(BarContainer, () => wrapper);

    test('should render null with items[0]', () => {
      wrapper.setProps({ items: [] });
      expect(wrapper.type()).toBeNull();
    });

    test('should be able to render a <g> wrapper', () => {
      wrapper = shallow(
        <BarContainer
          standalone
          items={rectItems}
        />,
      );
      expect(wrapper.find('g')).toHaveLength(1);
    });

    test('should have all bars 100% height', () => {
      wrapper.find('.Bar').forEach(bar => expect(bar.prop('height')).toBe('100%'));
    });

    test('should have all bars divide the width proportionally', () => {
      const bars = wrapper.find('.Bar');
      expect(bars.at(0).prop('width')).toBe('20%');
      expect(bars.at(1).prop('width')).toBe('80%');
    });
  });

  describe('vertical', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BarContainer vertical items={rectItems} />);
    });

    test('should scale bar height with the largest value', () => {
      const bars = wrapper.find('.Bar');
      expect(bars.at(0).prop('height')).toBe('25%');
      expect(bars.at(1).prop('height')).toBe('100%');
    });

    test('should have all bars equally divide the width', () => {
      const bars = wrapper.find('.Bar');
      expect(bars.at(0).prop('width')).toBe('50%');
      expect(bars.at(1).prop('width')).toBe('50%');
    });
  });

  describe('standalone', () => {
    test('should default to an svg', () => {
      const wrapper = shallow(<BarContainer items={rectItems} />);
      expect(wrapper.type()).toBe('svg');
    });

    test('should render a <g> when standalone', () => {
      const wrapper = shallow(<BarContainer standalone items={rectItems} />);
      expect(wrapper.type()).toBe('g');
    });
  });

  test('spreading additional props', () => {
    const wrapper = shallow((
      <BarContainer
        width="50px"
        style={{ display: 'inline-block' }}
        items={rectItems}
      />
    ));
    expect(wrapper.prop('width')).toBe('50px');
    expect(wrapper.prop('style')).toHaveProperty('display', 'inline-block');
  });
});

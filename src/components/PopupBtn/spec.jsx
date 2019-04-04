import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import PopupBtn from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|PopupBtn', () => {
  describe('with default props', () => {
    const wrapper = shallow(<PopupBtn icon="x" text="Test" action="" />);

    shouldBehaveLikeAComponent(PopupBtn, () => wrapper);
  });

  describe('as a link', () => {
    const wrapper = shallow(<PopupBtn
      text="Test"
      icon="x"
      action="https://www.example.com"
      attributes={{ target: '_blank' }}
    />);

    test('should render an anchor tag', () => {
      expect(wrapper.type()).toBe('a');
    });

    test('should pass its attributes to the anchor', () => {

    });
  });

  describe('as a button', () => {
    const spy = jest.fn();

    const wrapper = shallow(<PopupBtn
      text="Test"
      icon="x"
      action={spy}
    />);

    test('should render a button tag', () => {
      expect(wrapper.type()).toBe('button');
    });

    test('should call its onClick function', () => {
      wrapper.simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

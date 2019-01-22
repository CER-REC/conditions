import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

import BrowseByBtn from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|MyComponentName/BrowseByBtn', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<BrowseByBtn mode="company" onClick={spy} />);
    });

    shouldBehaveLikeAComponent(BrowseByBtn, () => wrapper);

    test('should render a button', () => {
      expect(wrapper.type()).toBe('button');
    });

    test('should render text and an svg with the graphic', () => {
      expect(wrapper.find('.BrowseByBtn-Wheel')).toHaveLength(1);
      expect(wrapper.find('.BrowseByBtn-ButtonText')).toHaveLength(1);
    });

    test('should render three elements inside the buttontext', () => {
      expect(wrapper.find('.BrowseByBtn-ButtonText').children()).toHaveLength(3);
    });

    test('should call its onClick prop once', () => {
      wrapper.find('.BrowseByBtn').simulate('click', eventFuncs);
      expect(spy.calledOnce).toBe(true);
    });
  });

  describe('with conditions by location', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<BrowseByBtn mode="location" onClick={spy} />);
    });

    test('should render three elements inside the buttontext', () => {
      expect(wrapper.find('.BrowseByBtn-ButtonText').children()).toHaveLength(3);
    });

    test('should call its onClick prop once', () => {
      wrapper.find('.BrowseByBtn').simulate('click', eventFuncs);
      expect(spy.calledOnce).toBe(true);
    });
  });
});


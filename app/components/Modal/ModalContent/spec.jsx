import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ModalContent from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Modal/ModalContent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <ModalContent
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(ModalContent, () => wrapper);

  test('should have a header', () => {
    expect(wrapper.find('.header').is('div')).toBe(true);
  });

  test('should have an area to load content', () => {
    expect(wrapper.find('.content').is('div')).toBe(true);
  });

  test('should have a footer', () => {
    expect(wrapper.find('.footer').is('div')).toBe(true);
  });

  test('should close dialog if close is clicked', () => {
    const spy = sinon.spy();
    wrapper = shallow((
      <ModalContent
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={spy}
      />
    ));
    wrapper.find('.closeIcon').simulate('click', eventFuncs);
    expect(spy.calledOnce).toBe(true);
  });

  test('should have a textButton where there is a modal action', () => {
    wrapper = shallow((
      <ModalContent
        type="image"
        content={<div>Test Content</div>}
        modalAction={{ task: noop }}
        isOpen
        closeModal={noop}
      />
    ));
    expect(wrapper.find('.textButton').is('button')).toBe(true);
  });

  test('should not render anything if isOpen is false', () => {
    wrapper = shallow((
      <ModalContent type="" content={<div>Test Content</div>} closeModal={noop} />
    ));
    expect(wrapper.type()).toBeNull();
  });
});

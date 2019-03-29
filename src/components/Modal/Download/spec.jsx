import React from 'react';
import { shallow } from 'enzyme';

import Download from '.';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Modal/ModalContent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <Download
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(Download, () => wrapper);

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
    const spy = jest.fn();
    wrapper = shallow((
      <Download
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={spy}
      />
    ));
    wrapper.find('.closeIcon').simulate('click', eventFuncs);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should have a textButton where there is a modal action', () => {
    wrapper = shallow((
      <Download
        type="image"
        content={<div>Test Content</div>}
        modalAction={noop}
        isOpen
        closeModal={noop}
      />
    ));
    expect(wrapper.find('.textButton').is('button')).toBe(true);
  });

  test('should not render anything if isOpen is false', () => {
    wrapper = shallow((
      <Download type="" content={<div>Test Content</div>} closeModal={noop} />
    ));
    expect(wrapper.type()).toBeNull();
  });
});

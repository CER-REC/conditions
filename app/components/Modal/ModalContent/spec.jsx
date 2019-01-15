import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
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
        title="Test Title"
        content={<div>Test Content</div>}
        isOpen
        closeModal={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(ModalContent, () => wrapper);

  it('should have a header', () => {
    expect(wrapper.find('.header').is('div')).to.equal(true);
  });

  it('should have an area to load content', () => {
    expect(wrapper.find('.content').is('div')).to.equal(true);
  });

  it('should have a footer', () => {
    expect(wrapper.find('.footer').is('div')).to.equal(true);
  });

  it('should close dialog if close is clicked', () => {
    const spy = sinon.spy();
    wrapper = shallow((
      <ModalContent
        title="Test Title"
        content={<div>Test Content</div>}
        isOpen
        closeModal={spy}
      />
    ));
    wrapper.find('.closeIcon').simulate('click', eventFuncs);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should have a textButton where ther is a modal action', () => {
    wrapper = shallow((
      <ModalContent
        title="Test Title"
        content={<div>Test Content</div>}
        modalAction={{
          text: 'Test Action',
          task: noop,
        }}
        isOpen
        closeModal={noop}
      />
    ));
    expect(wrapper.find('.textButton').is('button')).to.equal(true);
  });

  it('should not render anything if isOpen is false', () => {
    wrapper = shallow((
      <ModalContent title="Test Title" content={<div>Test Content</div>} closeModal={noop} />
    ));
    expect(wrapper.type()).to.equal(null);
  });
});

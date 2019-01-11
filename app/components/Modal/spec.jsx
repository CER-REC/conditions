import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Modal from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|Modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <Modal
        title="Test Title"
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={noop}
      />
    ));
  });

  shouldBehaveLikeAComponent(Modal, () => wrapper);

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
      <Modal
        title="Test Title"
        type=""
        content={<div>Test Content</div>}
        isOpen
        closeModal={spy}
      />
    ));
    wrapper.find('.closeIcon').simulate('click', eventFuncs);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should have a textButton where there is a modal action', () => {
    wrapper = shallow((
      <Modal
        title="Test Title"
        type="image"
        content={<div>Test Content</div>}
        modalAction={{
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
      <Modal title="Test Title" type="" content={<div>Test Content</div>} closeModal={noop} />
    ));
    expect(wrapper.type()).to.equal(null);
  });
});

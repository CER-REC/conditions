import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Modal from '.';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';

const noop = () => {};

describe('Components|Modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow((
      <Modal
        title="Test Title"
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

  it('should have a textButton where ther is a modal action', () => {
    wrapper = shallow((
      <Modal
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
      <Modal title="Test Title" content={<div>Test Content</div>} closeModal={noop} />
    ));
    expect(wrapper.type()).to.equal(null);
  });
});

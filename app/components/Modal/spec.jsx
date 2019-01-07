import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

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
        content={<div>Test Content</div>}
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

  describe('When the close icon is clicked', () => {
    beforeEach(() => {
      wrapper = shallow(<Modal title="Test Title" content={<div>Test Content</div>} />);
    });

    it('should close the modal', () => {
      expect(wrapper.state('isOpen')).to.equal(true);
      wrapper.find('.closeIcon').simulate('click', eventFuncs);
      expect(wrapper.state('isOpen')).to.equal(false);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('When there is a modal action', () => {
    beforeEach(() => {
      wrapper = shallow((
        <Modal
          title="Test Title"
          content={<div>Test Content</div>}
          modalAction={{
            text: 'Test Action',
            task: noop,
          }}
        />
      ));
    });
    it('should have a textButton', () => {
      expect(wrapper.find('.textButton').is('button')).to.equal(true);
    });
  });
});

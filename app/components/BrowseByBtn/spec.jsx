import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
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

    it('should render a button', () => {
      expect(wrapper.type()).to.equal('button');
    });

    it('should render text and an svg with the graphic', () => {
      expect(wrapper.find('.BrowseByBtn-Wheel')).to.have.lengthOf(1);
      expect(wrapper.find('.BrowseByBtn-ButtonText')).to.have.lengthOf(1);
    });

    it('should render three elements inside the buttontext', () => {
      expect(wrapper.find('.BrowseByBtn-ButtonText').children()).to.have.lengthOf(3);
    });

    it('should call its onClick prop once', () => {
      wrapper.find('.BrowseByBtn').simulate('click', eventFuncs);
      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('with conditions by location', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<BrowseByBtn mode="location" onClick={spy} />);
    });

    it('should render three elements inside the buttontext', () => {
      expect(wrapper.find('.BrowseByBtn-ButtonText').children()).to.have.lengthOf(3);
    });

    it('should call its onClick prop once', () => {
      wrapper.find('.BrowseByBtn').simulate('click', eventFuncs);
      expect(spy.calledOnce).to.equal(true);
    });
  });
});


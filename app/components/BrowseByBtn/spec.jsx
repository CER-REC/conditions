import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import BrowseByBtn from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|MyComponentName/BrowseByBtn', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<BrowseByBtn browseByCompany onClick={spy} />);
    });

    it('should render a button', () => {
      expect(wrapper.type()).to.equal('button');
    });

    it('should have a BrowseByBtn class', () => {
      expect(wrapper.is('.BrowseByBtn')).to.equal(true);
    });

    it('should render text and an svg with the graphic', () => {
      expect(wrapper.find('.BrowseByBtn-Wheel')).to.have.lengthOf(1);
      expect(wrapper.find('.BrowseByBtn-ButtonText')).to.have.lengthOf(1);
    });

    it('should render the words Projects by Company', () => {
      expect(wrapper.find('.BrowseByBtn-ButtonText').childAt(0).contains(<span>Projects by </span>)).to.equal(true);
      expect(wrapper.find('.BrowseByBtn-ButtonText').childAt(1).contains(<span className="LastWord">Company</span>)).to.equal(true);
    });

    it('should call its onClick prop once', () => {
      wrapper.find('.BrowseByBtn').simulate('click', eventFuncs);
      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('with conditions by location', () => {
    it('should render the words Conditions by Location', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<BrowseByBtn browseByLocation onClick={spy} />);
      expect(wrapper.find('.BrowseByBtn-ButtonText').childAt(0).contains(<span>Conditions by </span>)).to.equal(true);
      expect(wrapper.find('.BrowseByBtn-ButtonText').childAt(1).contains(<span className="LastWord">Location</span>)).to.equal(true);
    });
  });
});


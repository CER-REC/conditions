import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import List from './';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|List', () => {
  describe('without any items', () => {
    it('should not render anything', () => {
      const wrapper = shallow(<List items={[]} onChange={noop} />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<List items={['a', 'b', 'c']} onChange={noop} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a List class', () => {
      expect(wrapper.is('div.List')).to.equal(true);
    });

    it('should render a ul', () => {
      expect(wrapper.find('ul')).to.have.lengthOf(1);
    });

    it('should render 3 list items', () => {
      expect(wrapper.find('li.List-Item')).to.have.lengthOf(3);
    });
  });

  describe('with a selected item', () => {
    const listItems = ['a', 'b', 'c'];
    it('should only highlight one item', () => {
      const wrapper = shallow(<List items={listItems} selected="b" onChange={noop} />);
      expect(wrapper.find('.selected')).to.have.lengthOf(1);
    });

    it('should highlight the selected item', () => {
      const wrapper = shallow(<List items={listItems} selected="b" onChange={noop} />);
      expect(wrapper.find('.selected').text()).to.equal('b');
    });

    it("should highlight the first item if it isn't found", () => {
      const wrapper = shallow(<List items={listItems} selected="!" onChange={noop} />);
      expect(wrapper.find('.selected').text()).to.equal('a');
    });
  });

  describe('when a wrapped item is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<List items={['a', 'b', 'c']} onChange={spy} />);
    });

    it('should call its onChange prop with what was clicked', () => {
      wrapper.find('.List-Item').first().simulate('click', eventFuncs);
      expect(spy.calledWith('a')).to.equal(true);
    });

    it('should call its onChange prop with what enter was pressed on', () => {
      wrapper.find('.List-Item').first().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy.calledWith('a')).to.equal(true);
    });
  });

  describe('when wrapping is disabled', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<List items={['a', 'b', 'c']} onChange={spy} itemInteractions={false} />);
    });

    it('should not respond to clicks', () => {
      wrapper.find('.List-Item').first().simulate('click', eventFuncs);
      expect(spy.called).to.equal(false);
    });

    it('should not respond to keypresses', () => {
      wrapper.find('.List-Item').first().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy.called).to.equal(false);
    });
  });

  describe('with component items', () => {
    const TestComponent = props => <h1>{props.text}</h1>; // eslint-disable-line react/prop-types
    it('should render items', () => {
      const wrapper = mount(<List
        items={[
          <TestComponent key="hello" text="hello" />,
          <TestComponent key="world" text="world" />,
        ]}
        itemInteractions={false}
        onChange={noop}
      />);
      expect(wrapper.find('h1')).to.have.lengthOf(2);
    });
  });
});


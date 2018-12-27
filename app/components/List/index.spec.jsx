import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import List from '.';

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

    it('should render without the horizontal class', () => {
      expect(wrapper.hasClass('horizontal')).to.equal(false);
    });

    it('should render without the guideLine class', () => {
      expect(wrapper.hasClass('guideLine')).to.equal(false);
    });
  });

  describe('with a selected item', () => {
    const listItems = ['a', 'b', 'c'];
    it('should only highlight one item', () => {
      const wrapper = shallow(<List items={listItems} selected={1} onChange={noop} />);
      expect(wrapper.find('.selected')).to.have.lengthOf(1);
    });

    it('should highlight the selected item', () => {
      const wrapper = shallow(<List items={listItems} selected={1} onChange={noop} />);
      expect(wrapper.find('.selected .List-Item-Content').text()).to.equal('b');
    });

    it("should highlight the first item if it isn't found", () => {
      const wrapper = shallow(<List items={listItems} selected={9000} onChange={noop} />);
      expect(wrapper.find('.selected .List-Item-Content').text()).to.equal('a');
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
      wrapper.find('.List-Item').last().simulate('click', eventFuncs);
      expect(spy.calledWith(2)).to.equal(true);
    });

    it('should call its onChange prop with what enter was pressed on', () => {
      wrapper.find('.List-Item').last().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy.calledWith(2)).to.equal(true);
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

  describe('arrows', () => {
    let spy;
    let wrapper;

    beforeEach(() => {
      spy = sinon.spy();
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={1} onChange={spy} />);
    });

    it('should not show a previous arrow on the first item', () => {
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={spy} />);
      expect(wrapper.find('.arrowPrevious')).to.have.lengthOf(0);
    });

    it('should not show a next arrow on the last item', () => {
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={2} onChange={spy} />);
      expect(wrapper.find('.arrowNext')).to.have.lengthOf(0);
    });

    it('should show a previous arrow if there are available items', () => {
      expect(wrapper.find('.arrowPrevious')).to.have.lengthOf(1);
    });

    it('should show a next arrow if there are available items', () => {
      expect(wrapper.find('.arrowNext')).to.have.lengthOf(1);
    });

    it('should call its onChange prop with the previous index', () => {
      wrapper.find('.arrowPrevious').simulate('click', eventFuncs);
      expect(spy.calledWith(0)).to.equal(true);
      expect(spy.calledOnce).to.equal(true);
    });

    it('should call its onChange prop with the next index', () => {
      wrapper.find('.arrowNext').simulate('click', eventFuncs);
      expect(spy.calledWith(2)).to.equal(true);
      expect(spy.calledOnce).to.equal(true);
    });

    it('should render the arrows with vertical icons', () => {
      expect(wrapper.find('.arrowPrevious').children().prop('icon')).to.contain('up');
      expect(wrapper.find('.arrowNext').children().prop('icon')).to.contain('down');
    });
  });

  describe('styling', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<List items={['A']} selected={0} onChange={noop} className="my-class" guideLine />);
    });

    it('should accept a className', () => {
      expect(wrapper.find('.my-class')).to.have.lengthOf(1);
    });

    it('should render with the guideLine class', () => {
      expect(wrapper.hasClass('guideLine')).to.equal(true);
    });
  });

  describe('when provided the horizontal property', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<List items={['1', '2', '3', '4', '5']} selected={3} onChange={noop} horizontal />);
    });

    it('should render with the horizontal class', () => {
      expect(wrapper.hasClass('horizontal')).to.equal(true);
    });

    it('should render the arrows with horizontal icons', () => {
      expect(wrapper.find('.arrowPrevious').children().prop('icon')).to.contain('left');
      expect(wrapper.find('.arrowNext').children().prop('icon')).to.contain('right');
    });
  });
});

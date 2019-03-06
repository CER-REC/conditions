import React from 'react';
import { shallow, mount } from 'enzyme';

import List from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|List', () => {
  describe('without any items', () => {
    test('should not render anything', () => {
      const wrapper = shallow(<List items={[]} selected={0} onChange={noop} />);
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={noop} />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a List class', () => {
      expect(wrapper.is('div.List')).toBe(true);
    });

    test('should render a ul', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    test('should render 3 list items', () => {
      expect(wrapper.find('li.List-Item')).toHaveLength(3);
    });

    test('should render without the horizontal class', () => {
      expect(wrapper.hasClass('horizontal')).toBe(false);
    });

    test('should render without the guideLine class', () => {
      expect(wrapper.hasClass('guideLine')).toBe(false);
    });
  });

  describe('with a selected item', () => {
    const listItems = ['a', 'b', 'c'];
    test('should only highlight one item', () => {
      const wrapper = shallow(<List items={listItems} selected={1} onChange={noop} />);
      expect(wrapper.find('.selected')).toHaveLength(1);
    });

    test('should highlight the selected item', () => {
      const wrapper = shallow(<List items={listItems} selected={1} onChange={noop} />);
      expect(wrapper.find('.selected .List-Item-Content').text()).toBe('b');
    });

    test("should highlight the first item if it isn't found", () => {
      const wrapper = shallow(<List items={listItems} selected={9000} onChange={noop} />);
      expect(wrapper.find('.selected .List-Item-Content').text()).toBe('a');
    });
  });

  describe('when a wrapped item is clicked', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={spy} />);
    });

    test('should call its onChange prop with what was clicked', () => {
      wrapper.find('.List-Item-Content').last().simulate('click', eventFuncs);
      expect(spy).toHaveBeenLastCalledWith(2);
    });

    test('should call its onChange prop with what enter was pressed on', () => {
      wrapper.find('.List-Item-Content').last().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).toHaveBeenLastCalledWith(2);
    });
  });

  describe('when the list is scrolled', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={1} onChange={spy} />);
    });

    test('should recognize scrolling up', () => {
      wrapper.find('.List').first().simulate('wheel', { deltaY: -1, ...eventFuncs });
      expect(spy).toHaveBeenLastCalledWith(0);
    });

    test('should recognize scrolling down', () => {
      wrapper.find('.List').first().simulate('wheel', { deltaY: 1, ...eventFuncs });
      expect(spy).toHaveBeenLastCalledWith(2);
    });

    test('should not scroll if the delta is 0', () => {
      wrapper.find('.List').first().simulate('wheel', { deltaY: 0, ...eventFuncs });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  test('should not scroll up if the first item is already selected', () => {
    const spy = jest.fn();
    const wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={spy} />);
    wrapper.find('.List').first().simulate('wheel', { deltaY: -1, ...eventFuncs });
    expect(spy).not.toHaveBeenCalled();
  });

  test('should not scroll down if the last item is already selected', () => {
    const spy = jest.fn();
    const wrapper = shallow(<List items={['a', 'b', 'c']} selected={2} onChange={spy} />);
    wrapper.find('.List').first().simulate('wheel', { deltaY: 1, ...eventFuncs });
    expect(spy).not.toHaveBeenCalled();
  });

  describe('when wrapping is disabled', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={spy} itemInteractions={false} />);
    });

    test('should not respond to clicks', () => {
      wrapper.find('.List-Item').first().simulate('click', eventFuncs);
      expect(spy).not.toHaveBeenCalled();
    });

    test('should not respond to keypresses', () => {
      wrapper.find('.List-Item').first().simulate('keypress', { key: 'Enter', ...eventFuncs });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('with component items', () => {
    const TestComponent = props => <h1>{props.text}</h1>; // eslint-disable-line react/prop-types
    test('should render items', () => {
      const wrapper = mount(<List
        items={[
          <TestComponent key="hello" text="hello" />,
          <TestComponent key="world" text="world" />,
        ]}
        selected={0}
        itemInteractions={false}
        onChange={noop}
      />);
      expect(wrapper.find('h1')).toHaveLength(2);
    });
  });

  describe('arrows', () => {
    let spy;
    let wrapper;

    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={1} onChange={spy} />);
    });

    test('should not show a previous arrow on the first item', () => {
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={0} onChange={spy} />);
      expect(wrapper.find('.arrowPrevious')).toHaveLength(0);
    });

    test('should not show a next arrow on the last item', () => {
      wrapper = shallow(<List items={['a', 'b', 'c']} selected={2} onChange={spy} />);
      expect(wrapper.find('.arrowNext')).toHaveLength(0);
    });

    test('should show a previous arrow if there are available items', () => {
      expect(wrapper.find('.arrowPrevious')).toHaveLength(1);
    });

    test('should show a next arrow if there are available items', () => {
      expect(wrapper.find('.arrowNext')).toHaveLength(1);
    });

    test('should call its onChange prop with the previous index', () => {
      wrapper.find('.arrowPrevious').simulate('click', eventFuncs);
      expect(spy).toHaveBeenLastCalledWith(0);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should call its onChange prop with the next index', () => {
      wrapper.find('.arrowNext').simulate('click', eventFuncs);
      expect(spy).toHaveBeenLastCalledWith(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should render the arrows with vertical icons', () => {
      expect(wrapper.find('.arrowPrevious').children().prop('icon')).toContain('up');
      expect(wrapper.find('.arrowNext').children().prop('icon')).toContain('down');
    });
  });

  describe('styling', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<List items={['A']} selected={0} onChange={noop} className="my-class" guideLine />);
    });

    test('should accept a className', () => {
      expect(wrapper.find('.my-class')).toHaveLength(1);
    });

    test('should render with the guideLine class', () => {
      expect(wrapper.hasClass('guideLine')).toBe(true);
    });
  });

  describe('when provided the horizontal property', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<List items={['1', '2', '3', '4', '5']} selected={3} onChange={noop} horizontal />);
    });

    test('should render with the horizontal class', () => {
      expect(wrapper.hasClass('horizontal')).toBe(true);
    });

    test('should render the arrows with horizontal icons', () => {
      expect(wrapper.find('.arrowPrevious').children().prop('icon')).toContain('left');
      expect(wrapper.find('.arrowNext').children().prop('icon')).toContain('right');
    });
  });
});

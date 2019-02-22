import React from 'react';
import { shallow } from 'enzyme';
import SearchContent from '.';

const keywords = {
  include: [
    'access management',
    'condition comp',
    'department of',
    'fracture tough',
  ],
  exclude: [
    'exclude1', 'exclude2', 'exclude3', 'exclude4',
  ],
};

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SearchContent', () => {
  describe('with basic state ', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          updateKeywords={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
        />,
      );
    });

    test('a className of SearchContent', () => {
      expect(wrapper.find('.SearchContent')).toHaveLength(1);
    });

    test('render input', () => {
      expect(
        wrapper
          .find('input')
          .first()
          .hasClass('searchBar'),
      ).toBe(true);
    });

    test('render ul list with searchWords className', () => {
      expect(wrapper.find('ul.searchWords').first()).toHaveLength(1);
    });

    test('renders formatted message on include', () => {
      const updatedWrapper = wrapper
        .find('.includeText > FormattedMessage')
        .first();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe(
        'components.searchBar.findWords.searchText.basicInclude',
      );
    });
    test('render the default basic input box', () => {
      expect(wrapper.find('input')).toHaveLength(1);
    });
    test('render advanced searchText', () => {
      const updatedWrapper = wrapper.find(
        '.advancedSearchText FormattedMessage',
      );
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe(
        'components.searchBar.findWords.advancedSearch',
      );
    });
  });

  describe('advanced state', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          updateKeywords={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });

    test('render 2 input ', () => {
      expect(wrapper.find('.includeText')).toHaveLength(2);
      expect(wrapper.find('input')).toHaveLength(2);
    });

    test('render advanced dropdown with selectionOption of any', () => {
      const formattedMessageWrapper = wrapper.find('.includeText > FormattedMessage').first();
      expect(formattedMessageWrapper.prop('id')).toBe(
        'components.searchBar.findWords.searchText.advancedInclude',
      );
      const updatedWrapper = formattedMessageWrapper.shallowWithIntl();
      expect(updatedWrapper.find('Dropdown')).toHaveLength(1);
      expect(updatedWrapper.find('Dropdown').props().selectedOption).toBe('any');
    });

    test('with findAny as false, render selection option of all', () => {
      wrapper.setProps({ findAny: false });
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').first().shallowWithIntl();
      expect(updatedWrapper.find('Dropdown')).toHaveLength(1);
      expect(updatedWrapper.find('Dropdown').props().selectedOption).toBe('all');
    });
  });

  describe('onClick on the add button', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          updateKeywords={spy}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
        />,
      );
    });

    test('onClick on includeTextbox will call its addWord prop', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'test124' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('onClick on excludeTextbox will call its addWord prop', () => {
      const inputDiv = wrapper.find('.input').last();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'exclude123' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('without any word length it will not call the prop', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: '' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('will not call prop if it is the same word', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'department of' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('with full keywords list and in advanced state', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          keywords={{
            include: ['word1', 'word2', 'word3', 'word4', 'word5', 'word6'],
            exclude: ['except1', 'except2', 'except3', 'except4', 'except5', 'except6'],
          }}
          updateKeywords={spy}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });
    test('should not call prop with include word', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'test1' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should not call prop with exclude word', () => {
      const inputDiv = wrapper.find('.input').last();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'test1' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onClick of switch searchText', () => {
    let wrapper;
    let spy1;
    let spy2;
    beforeEach(() => {
      spy1 = jest.fn();
      spy2 = jest.fn();
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          updateKeywords={spy1}
          closeTab={noop}
          findAny
          findAnyOnChange={spy2}
        />,
      );
    });
    test('with basic mode', () => {
      const basicWrapper = wrapper.find('.advancedSearchText > button');
      basicWrapper.simulate('click', eventFuncs);
      expect(spy1).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
      expect(wrapper.state().mode).toBe('advanced');
    });

    test('with advanced mode', () => {
      wrapper.setState({ mode: 'advanced' });
      const updatedWrapper = wrapper.find('.advancedSearchText > button');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy1).toBeCalledTimes(1);
      expect(spy2).toBeCalledTimes(1);
      expect(wrapper.state().mode).toBe('basic');
    });
  });

  describe('on delete of keywords', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          updateKeywords={spy}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });
    test('onClick, should call onchange prop on include', () => {
      const li = wrapper.find('.deleteButton > button').first();
      li.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
    });

    test('onEnter, should call prop on include', () => {
      const li = wrapper.find('.deleteButton > button').first();
      li.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toBeCalledTimes(1);
    });

    test('should call prop on exclude', () => {
      const li = wrapper.find('.deleteButton > button').last();
      li.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
    });

    test('onEnter, should call prop on exclude', () => {
      const li = wrapper.find('.deleteButton > button').last();
      li.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toBeCalledTimes(1);
    });
  });
});

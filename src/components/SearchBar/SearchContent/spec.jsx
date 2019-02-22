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
        'components.searchBar.findWords.searchText.include',
      );
    });
    test('renders search text', () => {
      const updatedWrapper = wrapper
        .find('.includeText > FormattedMessage')
        .at(1)
        .shallowWithIntl();
      expect(updatedWrapper.hasClass('spacedText')).toBe(true);
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
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });

    test('render 2 input ', () => {
      expect(wrapper.find('.includeText')).toHaveLength(2);
      expect(wrapper.find('input')).toHaveLength(2);
    });

    test('formatted message should spacedClass', () => {
      const updatedWrapper = wrapper
        .find('.includeText').last()
        .find('FormattedMessage').at(1)
        .shallowWithIntl();
      expect(updatedWrapper.hasClass('spacedText')).toBe(true);
    });

    test('formatted message should have lowercase class', () => {
      const updatedWrapper = wrapper
        .find('.includeText').last()
        .find('FormattedMessage').at(2)
        .shallowWithIntl();
      expect(updatedWrapper.hasClass('lowerCase')).toBe(true);
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

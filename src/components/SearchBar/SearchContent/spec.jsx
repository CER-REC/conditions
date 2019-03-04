import React from 'react';
import { shallow } from 'enzyme';
import SearchContent from '.';

const includeKeywords = [
  'access management',
  'condition comp',
  'department of',
  'fracture tough',
];

const excludeKeywords = ['exclude1', 'exclude2'];

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SearchContent', () => {
  describe('with basic state ', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          includeKeywords={includeKeywords}
          excludeKeywords={[]}
          setIncluded={noop}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={noop}
        />,
      );
      wrapper.setState({ mode: 'basic' });
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
    test('render advanced searchBar toggle text', () => {
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
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          setIncluded={noop}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });

    test('render 2 input ', () => {
      expect(wrapper.find('.includeText')).toHaveLength(2);
      expect(wrapper.find('input')).toHaveLength(2);
    });

    test('render bolded text in exclude', () => {
      const updatedWrapper = wrapper.find('.includeText').last()
        .find('FormattedMessage')
        .shallowWithIntl()
        .find('FormattedMessage')
        .shallowWithIntl();
      expect(updatedWrapper.find('strong')).toHaveLength(1);
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

    test('with findAny as false, render dropdown with all as the option', () => {
      wrapper.setProps({ findAny: false });
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').first().shallowWithIntl();
      expect(updatedWrapper.find('Dropdown')).toHaveLength(1);
      expect(updatedWrapper.find('Dropdown').props().selectedOption).toBe('all');
    });

    test('render none text in summary', () => {
      const updatedWrapper = wrapper.find('.anyText').at(1)
        .find('FormattedMessage')
        .shallowWithIntl()
        .find('FormattedMessage');
      expect(updatedWrapper.prop('id')).toBe(
        'components.searchBar.findWords.highlightText.none',
      );
      expect(updatedWrapper.shallowWithIntl().hasClass('upperCase')).toBe(true);
    });

    test('when findAny is true, render any text in summary', () => {
      const updatedWrapper = wrapper.find('.anyText').first()
        .find('FormattedMessage')
        .shallowWithIntl()
        .find('FormattedMessage');
      expect(updatedWrapper.prop('id')).toBe(
        'components.searchBar.findWords.highlightText.any',
      );
      expect(updatedWrapper.shallowWithIntl().hasClass('upperCase')).toBe(true);
    });

    test('when findAny is false, render all text in summary', () => {
      wrapper.setProps({ findAny: false });
      const updatedWrapper = wrapper.find('.anyText').first()
        .find('FormattedMessage')
        .shallowWithIntl()
        .find('FormattedMessage');
      expect(updatedWrapper.prop('id')).toBe(
        'components.searchBar.findWords.highlightText.all',
      );
      expect(updatedWrapper.shallowWithIntl().hasClass('upperCase')).toBe(true);
    });
  });

  describe('onChange of dropdown', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          setIncluded={noop}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={spy}
          changeIsExclude={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });
    test('onChange when the option selected is any', () => {
      const dropdown = wrapper.find('.includeText > FormattedMessage').first().shallowWithIntl().find('Dropdown');
      dropdown.simulate('change', 'any');
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(true);
    });
    test('onChange when the option selected is all', () => {
      wrapper.setProps({ findAny: false });
      const dropdown = wrapper.find('.includeText > FormattedMessage').first().shallowWithIntl().find('Dropdown');
      dropdown.simulate('change', 'all');
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(false);
    });
  });

  describe('onClick on the add button', () => {
    let wrapper;
    let spyInclude;
    let spyExclude;
    beforeEach(() => {
      spyInclude = jest.fn();
      spyExclude = jest.fn();
      wrapper = shallow(
        <SearchContent
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          setIncluded={spyInclude}
          setExcluded={spyExclude}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });

    test('onClick on includeTextbox will call its include prop', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'test124' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spyInclude).toHaveBeenCalledTimes(1);
    });

    test('onClick on excludeTextbox will call its exclude prop', () => {
      const inputDiv = wrapper.find('.input').last();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'exclude123' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spyExclude).toHaveBeenCalledTimes(1);
    });

    test('without any word length it will not call the prop', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: '' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spyInclude).toHaveBeenCalledTimes(0);
    });

    test('will not call prop if it is the same word', () => {
      const inputDiv = wrapper.find('.input').first();
      const input = inputDiv.find('input');
      input.simulate('change', { target: { value: 'department of' } });
      const addButton = inputDiv.find('.addInput');
      addButton.simulate('click', eventFuncs);
      expect(spyInclude).toHaveBeenCalledTimes(0);
    });
  });

  describe('with full keywords list and in advanced state', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          includeKeywords={['word1', 'word2', 'word3', 'word4', 'word5', 'word6']}
          excludeKeywords={['except1', 'except2', 'except3', 'except4', 'except5', 'except6']}
          setIncluded={spy}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={noop}
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

  describe('onClick of search toggle text', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          includeKeywords={includeKeywords}
          excludeKeywords={[]}
          setIncluded={noop}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={spy}
          changeIsExclude={noop}
        />,
      );
    });
    test('with basic mode', () => {
      const basicWrapper = wrapper.find('.advancedSearchText > button');
      basicWrapper.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
      expect(wrapper.state().mode).toBe('advanced');
    });

    test('with advanced mode', () => {
      wrapper.setState({ mode: 'advanced' });
      const updatedWrapper = wrapper.find('.advancedSearchText > button');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
      expect(wrapper.state().mode).toBe('basic');
    });
  });

  describe('on delete of keywords', () => {
    let wrapper;
    let spyInclude;
    let spyExclude;
    beforeEach(() => {
      spyInclude = jest.fn();
      spyExclude = jest.fn();
      wrapper = shallow(
        <SearchContent
          includeKeywords={['word1', 'word2', 'word3', 'word4', 'word5', 'word6']}
          excludeKeywords={['except1', 'except2', 'except3', 'except4', 'except5', 'except6']}
          setIncluded={spyInclude}
          setExcluded={spyExclude}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={noop}
        />,
      );
      wrapper.setState({ mode: 'advanced' });
    });
    test('onClick, should call onchange prop on include', () => {
      const li = wrapper.find('.deleteButton > button').first();
      li.simulate('click', eventFuncs);
      expect(spyInclude).toBeCalledTimes(1);
    });

    test('onEnter, should call prop on include', () => {
      const li = wrapper.find('.deleteButton > button').first();
      li.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spyInclude).toBeCalledTimes(1);
    });

    test('should call prop on exclude', () => {
      const li = wrapper.find('.deleteButton > button').last();
      li.simulate('click', eventFuncs);
      expect(spyExclude).toBeCalledTimes(1);
    });

    test('onEnter, should call prop on exclude', () => {
      const li = wrapper.find('.deleteButton > button').last();
      li.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spyExclude).toBeCalledTimes(1);
    });
  });

  describe('on focus on text box', () => {
    test('should call the prop', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <SearchContent
          includeKeywords={['word1', 'word2', 'word3', 'word4', 'word5', 'word6']}
          excludeKeywords={['except1', 'except2', 'except3', 'except4', 'except5', 'except6']}
          setIncluded={noop}
          setExcluded={noop}
          closeTab={noop}
          findAny
          findAnyOnChange={noop}
          changeIsExclude={spy}
        />,
      );
      const updatedWrapper = wrapper.find('input').last();
      updatedWrapper.simulate('focus');
      expect(spy).toBeCalledTimes(1);
    });
  });
});

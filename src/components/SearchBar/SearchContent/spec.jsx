import React from 'react';
import { shallow } from 'enzyme';
import SearchContent from '.';
import { mountWithIntl } from '../../../tests/utilities';

const keywords = ['access management',
  'condition comp',
  'drinking water',
  'Assiniboine River',
  'department of', 'fracture tough'];

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SearchContent', () => {
  describe('with display prop as false', () => {
    test('it should not render the component', () => {
      const wrapper = shallow(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          display={false}
          mode="basic"
          deleteWord={noop}
          addWord={noop}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('with basic mode props being passed in ', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          mode="basic"
          display
          deleteWord={noop}
          addWord={noop}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
    });

    test('a className of SearchContent', () => {
      expect(wrapper.find('.SearchContent')).toHaveLength(1);
    });

    test('render input', () => {
      expect(wrapper.find('input').first().hasClass('searchBar')).toBe(true);
    });

    test('render ul list with searchWords className', () => {
      expect(wrapper.find('ul.searchWords').first()).toHaveLength(1);
    });

    test('renders formatted message on include', () => {
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').first();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe(
        'components.SearchBar.findWords.searchText.include',
      );
    });
    test('renders advanced search text (different from advanced)', () => {
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').at(1).shallowWithIntl();
      expect(updatedWrapper.text()).toBe('any');
    });
    test('render the default basic input box', () => {
      expect(wrapper.find('input')).toHaveLength(1);
    });
    test('render advanced searchText', () => {
      const updatedWrapper = wrapper.find('.advancedSearchText > FormattedMessage');
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.findWords.advancedSearch');
    });
  });

  describe('advanced prop passed in', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          mode="advanced"
          display
          deleteWord={noop}
          addWord={noop}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
    });

    test('render 2 input', () => {
      expect(wrapper.find('input')).toHaveLength(2);
    });

    test('renders advanced search text (different from basic)', () => {
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').at(1).shallowWithIntl();
      expect(updatedWrapper.text()).toBe('ANY');
    });
    test('render advanced searchText', () => {
      const updatedWrapper = wrapper.find('.advancedSearchText > FormattedMessage');
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.findWords.basicSearch');
    });

    test('render includeText', () => {
      const updatedWrapper = wrapper.find('.includeText > FormattedMessage').first();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.findWords.searchText.include');
      expect(updatedWrapper.shallowWithIntl().text()).toBe('Include');
    });

    test('render anyText', () => {
      const updatedWrapper = wrapper.find('.anyText > FormattedMessage').at(2);
      expect(updatedWrapper.shallowWithIntl().text()).toBe('NONE');
    });
  });

  describe('onClick call the addWord prop', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = mountWithIntl(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          mode="advanced"
          display
          deleteWord={noop}
          addWord={spy}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
    });
    test('without textInput, will return null', () => {
      const addButton = wrapper.find('.input').first().find('CircleContainer');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('key enter will call its addWord prop', () => {
      const addButton = wrapper.find('.input').first().find('CircleContainer');
      addButton.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick on addButton for exclude', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = mountWithIntl(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          mode="advanced"
          display
          deleteWord={noop}
          addWord={spy}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
    });
    test('without textInput, will return null', () => {
      const addButton = wrapper.find('.input').last().find('CircleContainer');
      addButton.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('key enter will call its addWord prop', () => {
      const addButton = wrapper.find('.input').last().find('CircleContainer');
      addButton.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('li click on x', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          exceptKeywords={[]}
          mode="advanced"
          display
          deleteWord={spy}
          addWord={noop}
          closeTab={noop}
          changeSearchType={noop}
        />,
      );
    });
    test('the click will call its deleteWord prop', () => {
      const liDelete = wrapper.find('.searchWords > span').first();
      liDelete.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
    });

    test('mouse enter will call its deleteWord prop', () => {
      const liDelete = wrapper.find('.searchWords > span').first();
      liDelete.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toBeCalledTimes(1);
    });
  });
});

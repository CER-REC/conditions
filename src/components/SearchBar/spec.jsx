import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '.';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const sampleSuggestedKeywords = [
  {
    name: 'safety',
    category: ['administration & filings'],
    conditionCount: 1201,
  },
  {
    name: 'emissions',
    category: ['environment'],
    conditionCount: 1001,
  },
  {
    name: 'habitat',
    category: ['environment', 'oversight & safety'],
    conditionCount: 801,
  },
  {
    name: 'construction',
    category: ['environment'],
    conditionCount: 1001,
  },
];

const includeKeywords = ['safety'];
const excludeKeywords = ['exclude1'];
const projectStatus = ['IN_PROGRESS'];
const yearRange = { start: 1970, end: 1980 };
const categories = ['all', 'oversight & safety', 'environment', 'administration & filings'];

describe('Components|SearchBar/SearchBar', () => {
  describe('default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchBar
          suggestedKeywords={sampleSuggestedKeywords}
          availableYearRange={yearRange}
          availableCategories={categories}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          projectStatus={projectStatus}
          yearRange={yearRange}
          setIncluded={noop}
          setExcluded={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          scrollToMethodology={noop}
          findAny
        />,
      );
    });
    test('a className of SearchBar', () => {
      expect(wrapper.find('.SearchBar')).toHaveLength(1);
    });

    test('render highlight summary when tabs closed', () => {
      expect(wrapper.find('HighlightSummary')).toHaveLength(1);
    });
  });

  describe('tabs', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchBar
          suggestedKeywords={sampleSuggestedKeywords}
          availableYearRange={yearRange}
          availableCategories={categories}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          projectStatus={projectStatus}
          yearRange={yearRange}
          setIncluded={noop}
          setExcluded={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          scrollToMethodology={noop}
          findAny
        />,
      );
    });
    test('render find component on find click', () => {
      const updatedWrapper = wrapper.find('Tab').first();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().mode).toEqual('find');
    });

    test('close find component on find click', () => {
      wrapper.setState({ mode: 'find' });
      const updatedWrapper = wrapper.find('Tab').first();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().mode).toEqual('');
    });

    test('render filter component on filter click', () => {
      const updatedWrapper = wrapper.find('Tab').last();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().mode).toEqual('filter');
    });

    test('close filter component on filter click', () => {
      wrapper.setState({ mode: 'filter' });
      const updatedWrapper = wrapper.find('Tab').last();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().mode).toEqual('');
    });
  });

  describe(' with mode set to find', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SearchBar
          suggestedKeywords={sampleSuggestedKeywords}
          availableYearRange={yearRange}
          availableCategories={categories}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          projectStatus={projectStatus}
          yearRange={yearRange}
          setIncluded={noop}
          setExcluded={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          scrollToMethodology={spy}
          findAny
        />,
      );
      wrapper.setState({ mode: 'find', isActive: true, isExclude: false });
    });

    test('render SearchContent when mode is find', () => {
      expect(wrapper.find('SearchContent')).toHaveLength(1);
    });

    test('closeTab function of SearchContent changes mode', () => {
      wrapper.find('SearchContent').props().closeTab();
      expect(wrapper.state().mode).toBe('');
    });

    test('changeIsExclude function changing the exclude state', () => {
      wrapper.find('SearchContent').props().changeIsExclude(true);
      expect(wrapper.state().isExclude).toBe(true);
    });

    test('render SuggestedKeywordsPopout when active is true', () => {
      wrapper.setState({ isActive: true });
      expect(wrapper.find('SuggestedKeywordsPopout')).toHaveLength(1);
    });

    test('close tab of SuggestedKeywordsPopout changes the active state', () => {
      wrapper.find('SuggestedKeywordsPopout').props().closeTab();
      expect(wrapper.state().isActive).toBe(false);
    });

    test('passes scrollToMethodology prop to SuggestedKeywords', () => {
      wrapper.find('SuggestedKeywordsPopout')
        .props()
        .scrollToMethodology();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with mode set to filter', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchBar
          suggestedKeywords={sampleSuggestedKeywords}
          availableYearRange={yearRange}
          availableCategories={categories}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          projectStatus={projectStatus}
          yearRange={yearRange}
          setIncluded={noop}
          setExcluded={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          scrollToMethodology={noop}
          findAny
        />,
      );
      wrapper.setState({ mode: 'filter' });
    });
    test('render filter content when mode is filter', () => {
      wrapper.setState({ mode: 'filter' });
      expect(wrapper.find('FilterContent')).toHaveLength(1);
    });
    test('onClick on closeTab change mode', () => {
      wrapper.find('FilterContent').props().closeTab();
      expect(wrapper.state().mode).toBe('');
    });
  });

  describe('on suggestion prompt', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchBar
          suggestedKeywords={sampleSuggestedKeywords}
          scrollToMethodology={noop}
          availableYearRange={yearRange}
          availableCategories={categories}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          projectStatus={projectStatus}
          yearRange={yearRange}
          setIncluded={noop}
          setExcluded={noop}
          findAnyOnChange={noop}
          updateYear={noop}
          changeProjectStatus={noop}
          findAny
        />,
      );
      wrapper.setState({ mode: 'find' });
    });

    test('prompt styles when selected on include', () => {
      const updatedWrapper = wrapper.find('.SuggestionPrompt');
      expect(updatedWrapper.hasClass('excludePrompt')).toBe(false);
    });

    test('prompt styles when selected on exclude', () => {
      wrapper.setState({ isExclude: true });
      const updatedWrapper = wrapper.find('.SuggestionPrompt');
      expect(updatedWrapper.hasClass('excludePrompt')).toBe(true);
    });

    test('change active state on click ', () => {
      const updatedWrapper = wrapper.find('.SuggestionPrompt');
      updatedWrapper.find('SuggestedKeywordsPrompt').props().onClick();
      expect(wrapper.state().isActive).toBe(true);
    });
  });
});

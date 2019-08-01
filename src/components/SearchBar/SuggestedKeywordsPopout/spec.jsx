import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import SuggestedKeywordsPopout from '.';

const words = [
  {
    name: 'deer',
    category: ['wildlife & habitat'],
    conditionCount: 1300,
  },
  {
    name: 'alberta',
    category: ['administration & filing'],
    conditionCount: 500,
  },
];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };
const includedKeywords = ['deer'];
const excludedKeywords = [];
const categories = ['all', 'wildlife & habitat', 'environment'];

describe('Components|SearchBar/SuggestedKeywordsPopout', () => {
  describe('with default props', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          setIncluded={noop}
          setExcluded={noop}
          includeKeywords={includedKeywords}
          excludeKeywords={excludedKeywords}
          closeTab={noop}
          isExclude={false}
          scrollToMethodology={spy}
        />,
      );
    });

    shouldBehaveLikeAComponent(SuggestedKeywordsPopout, () => wrapper);

    test('calls scrollToMethodology prop when "here" link is clicked', () => {
      // Drilling into the formatted message components to get the actual link
      const anchor = wrapper.find('.description')
        .shallowWithIntl()
        .shallowWithIntl()
        .find('AdvancedFormattedMessage')
        .shallowWithIntl()
        .shallowWithIntl()
        .shallowWithIntl();

      anchor
        .find('a')
        .simulate('click', eventFuncs);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with sortBy as alphabetical', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          setIncluded={noop}
          setExcluded={noop}
          includeKeywords={includedKeywords}
          excludeKeywords={excludedKeywords}
          closeTab={noop}
          isExclude={false}
          scrollToMethodology={noop}
        />,
      );
      wrapper.setState({ sortByCount: false });
    });
    test('only alphabetical should have a classname of "selectedSort"', () => {
      const updatedWrapper = wrapper.find('.rightText AdvancedFormattedMessage');
      expect(updatedWrapper.at(0).hasClass('selectedSort')).toBe(false);
      expect(updatedWrapper.at(1).hasClass('selectedSort')).toBe(true);
    });

    test('clicking on frequency text should call changeSort ', () => {
      const updatedWrapper = wrapper.find('.rightText AdvancedFormattedMessage')
        .at(0)
        .shallowWithIntl()
        .shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortByCount).toBe(true);
    });
  });

  describe('with sortBy as frequency', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          setIncluded={noop}
          setExcluded={noop}
          includeKeywords={includedKeywords}
          excludeKeywords={excludedKeywords}
          closeTab={noop}
          isExclude={false}
          scrollToMethodology={noop}
        />,
      );
      wrapper.setState({ sortByCount: true });
    });
    test('only frequency should have a classname of "selectedSort"', () => {
      const updatedWrapper = wrapper.find('.rightText AdvancedFormattedMessage');
      expect(updatedWrapper.at(0).hasClass('selectedSort')).toBe(true);
      expect(updatedWrapper.at(1).hasClass('selectedSort')).toBe(false);
    });
    test('clicking on alphabetical text should call changeSort', () => {
      const updatedWrapper = wrapper.find('.rightText AdvancedFormattedMessage')
        .at(1)
        .shallowWithIntl()
        .shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortByCount).toBe(false);
    });
  });

  describe('with sortHierarchy as inc', () => {
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        setIncluded={noop}
        setExcluded={noop}
        includeKeywords={includedKeywords}
        excludeKeywords={excludedKeywords}
        closeTab={noop}
        isExclude={false}
        scrollToMethodology={noop}
      />,
    );
    test('onClick of hierarchy text, should set to dec', () => {
      wrapper.setState({ sortDesc: false });
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortDesc).toBe(true);
    });
  });

  describe('with sortHierarchy as dec', () => {
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        setIncluded={noop}
        setExcluded={noop}
        includeKeywords={includedKeywords}
        excludeKeywords={excludedKeywords}
        closeTab={noop}
        isExclude={false}
        scrollToMethodology={noop}
      />,
    );
    test('onClick of hierarchy text, should set to inc', () => {
      wrapper.setState({ sortDesc: true });
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortDesc).toBe(false);
    });
  });

  describe('onClick for category', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          setIncluded={noop}
          setExcluded={noop}
          includeKeywords={includedKeywords}
          excludeKeywords={excludedKeywords}
          closeTab={noop}
          isExclude={false}
          scrollToMethodology={noop}
        />,
      );
    });

    test('onClick on not highlighted category (gray), must change state', () => {
      const updatedWrapper = wrapper.find('.categories li').at(1);
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(1);
    });

    test('onClick on highlighted prop, must change state ', () => {
      const updatedWrapper = wrapper.find('.categories li').at(1);
      updatedWrapper.simulate('click', eventFuncs);
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(0);
    });

    test('onClick on all resets the categories', () => {
      const updatedWrapper = wrapper.find('.categories li');
      updatedWrapper.at(1).simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(1);
      updatedWrapper.first().simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(0);
    });
  });

  describe('sorting keywords appropriately', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          setIncluded={noop}
          setExcluded={noop}
          includeKeywords={includedKeywords}
          excludeKeywords={excludedKeywords}
          closeTab={noop}
          isExclude={false}
          scrollToMethodology={noop}
        />,
      );
    });

    test('with sortBy as alphabetical, and hierarchy as inc', () => {
      wrapper.setState({ sortByCount: false, sortDesc: false });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstWord = updatedWrapper[0].name;
      const secondWord = updatedWrapper[1].name;
      expect(firstWord < secondWord).toBe(true);
    });

    test('with sortBy as alphabetical, and hierarchy as dec', () => {
      wrapper.setState({ sortByCount: false, sortDesc: true });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstWord = updatedWrapper[0].name;
      const secondWord = updatedWrapper[1].name;
      expect(firstWord > secondWord).toBe(true);
    });

    test('with sortBy as frequency, and hierarchy as inc', () => {
      wrapper.setState({ sortByCount: true, sortDesc: false });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstCondition = updatedWrapper[0].conditionCount;
      const secondCondition = updatedWrapper[1].conditionCount;
      expect(firstCondition < secondCondition).toBe(true);
    });

    test('with sortBy as frequency, and hierarchy as dec', () => {
      wrapper.setState({ sortByCount: true, sortDesc: true });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstCondition = updatedWrapper[0].conditionCount;
      const secondCondition = updatedWrapper[1].conditionCount;
      expect(firstCondition > secondCondition).toBe(true);
    });
  });
});

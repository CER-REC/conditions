import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import SuggestedKeywordsPopout from '.';

const words = {
  deer: { conditions: 1200, category: ['wildlife & habitat'] },
  alberta: { conditions: 400, category: ['administration & filings'] },
};
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const categories = ['all', 'wildlife & habitat', 'environment'];

xdescribe('Components|SearchBar/SuggestedKeywordsPopout', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClick={noop}
          selectedWords={['deer']}
          closeTab={noop}
        />,
      );
    });

    shouldBehaveLikeAComponent(SuggestedKeywordsPopout, () => wrapper);
  });

  describe('with sortBy not set', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        onClick={noop}
        closeTab={noop}
        selectedWords={['deer']}
      />);
    });

    test('should not render className of selectedSort', () => {
      const updatedWrapper = wrapper.find('.rightText > FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(false);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(false);
    });

    test('if frequency is selected, change state with frequency', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(1).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortBy).toBe('frequency');
    });

    test('if alphabetical is selected, change state with alphabetical', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(2).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortBy).toBe('alphabetical');
    });
  });

  describe('with sortBy as alphabetical', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClick={noop}
          selectedWords={['deer']}
          closeTab={noop}
        />,
      );
      wrapper.setState({ sortBy: 'alphabetical' });
    });
    test('if sortBy is not frequency, should render className of selectedSort', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(false);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(true);
    });

    test('on frequency text should call changeSort ', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(2).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortBy).toBe('');
    });
  });

  describe('with sortBy as frequency', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClick={noop}
          closeTab={noop}
          selectedWords={['deer']}
        />,
      );
      wrapper.setState({ sortBy: 'frequency' });
    });
    test('should only set frequency with className', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(true);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(false);
    });
    test('on frequency text should reset sort ', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(1).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortBy).toBe('');
    });
  });

  describe('with sortHierarchy as none', () => {
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        onClick={noop}
        closeTab={noop}
        selectedWords={['deer']}
      />,
    );
    test('onClick of hierarchy text, should change the state with inc', () => {
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortHierarchy).toBe('inc');
    });
  });

  describe('with sortHierarchy as inc', () => {
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        onClick={noop}
        closeTab={noop}
        selectedWords={['deer']}
      />,
    );
    test('onClick of hierarchy text, should call the spy with dec', () => {
      wrapper.setState({ sortHierarchy: 'inc' });
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortHierarchy).toBe('dec');
    });
  });

  describe('with sortHierarchy as dec', () => {
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        suggestedKeywords={words}
        onClick={noop}
        closeTab={noop}
        selectedWords={['deer']}
      />,
    );
    test('onClick of hierarchy text, should call the spy with none', () => {
      wrapper.setState({ sortHierarchy: 'dec' });
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().sortHierarchy).toBe('none');
    });
  });

  describe('onClick for category', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClick={noop}
          closeTab={noop}
          selectedWords={['deer']}
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
          onClick={noop}
          closeTab={noop}
          selectedWords={['deer']}
        />,
      );
    });

    test('with sortBy as alphabetical, and hierarchy as inc', () => {
      wrapper.setState({ sortBy: 'alphabetical', sortHierarchy: 'inc' });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstWord = updatedWrapper[0][0];
      const secondWord = updatedWrapper[1][0];
      expect(firstWord < secondWord).toBe(true);
    });

    test('with sortBy as alphabetical, and hierarchy as dec', () => {
      wrapper.setState({ sortBy: 'alphabetical', sortHierarchy: 'dec' });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstWord = updatedWrapper[0][0];
      const secondWord = updatedWrapper[1][0];
      expect(firstWord > secondWord).toBe(true);
    });

    test('with sortBy as frequency, and hierarchy as inc', () => {
      wrapper.setState({ sortBy: 'frequency', sortHierarchy: 'inc' });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstCondition = updatedWrapper[0][1].conditions;
      const secondCondition = updatedWrapper[1][1].conditions;
      expect(firstCondition < secondCondition).toBe(true);
    });

    test('with sortBy as frequency, and hierarchy as dec', () => {
      wrapper.setState({ sortBy: 'frequency', sortHierarchy: 'dec' });
      const updatedWrapper = wrapper.find('KeywordList').props().keywords;
      const firstCondition = updatedWrapper[0][1].conditions;
      const secondCondition = updatedWrapper[1][1].conditions;
      expect(firstCondition > secondCondition).toBe(true);
    });
  });
});

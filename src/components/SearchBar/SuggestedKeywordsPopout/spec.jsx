import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';
import SuggestedKeywordsPopout from '.';

const words = [{
  name: 'safety',
  conditions: 1200,
},
{
  name: 'emissions',
  conditions: 1000,
}, {
  name: 'habitat',
  conditions: 800,
}];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const categories = ['all', 'wildlife & habitat', 'environment'];

describe('Components|SearchBar/SuggestedKeywordsPopout', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClickUpdate={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
        onClickUpdate={noop}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
          onClickUpdate={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
          onClickUpdate={noop}
          closeTab={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
        onClickUpdate={noop}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
      />,
    );
    test('onClick of hierarchy text, should call the spy with inc', () => {
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
        onClickUpdate={noop}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
        onClickUpdate={noop}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
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
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          suggestedKeywords={words}
          onClickUpdate={spy}
          closeTab={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
        />,
      );
    });

    test('onClick on not highlighted category (gray), must call onClickUpdate prop', () => {
      const updatedWrapper = wrapper.find('.categories li').first();
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(1);
    });

    test('onClick on highlighted prop, must call on ClickUpdateProp ', () => {
      const updatedWrapper = wrapper.find('.categories li').first();
      updatedWrapper.simulate('click', eventFuncs);
      updatedWrapper.simulate('click', eventFuncs);
      expect(wrapper.state().selectedCategory).toHaveLength(0);
    });
  });
});

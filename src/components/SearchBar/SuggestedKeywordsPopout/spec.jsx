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
          selectedCategory={['wildlife & habitat']}
          sortBy=""
          sortHierarchy="none"
          suggestedKeywords={words}
          onClickUpdate={noop}
          changeSort={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
          closeTab={noop}
        />,
      );
    });

    shouldBehaveLikeAComponent(SuggestedKeywordsPopout, () => wrapper);

    test('if sortBy prop is not frequency, should not render className of selectedSort', () => {
      const updatedWrapper = wrapper.find('.rightText > FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(false);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(false);
    });
  });

  describe('with sortBy prop as alphabetical', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          selectedCategory={['wildlife & habitat']}
          sortBy="alphabetical"
          sortHierarchy="none"
          suggestedKeywords={words}
          onClickUpdate={noop}
          changeSort={spy}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
          closeTab={noop}
        />,
      );
    });
    test('if sortBy prop is not frequency, should render className of selectedSort', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(false);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(true);
    });

    test('on frequency text should call changeSort prop ', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(2).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledWith(['', 'by']);
    });
  });

  describe('with sortBy prop not set', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(<SuggestedKeywordsPopout
        categories={categories}
        selectedCategory={['wildlife & habitat']}
        sortBy=""
        sortHierarchy="none"
        suggestedKeywords={words}
        onClickUpdate={noop}
        changeSort={spy}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
      />);
    });

    test('if frequency is selected, call its prop with frequency', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(1).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledWith(['frequency', 'by']);
    });

    test('if alphabetical is selected, call its prop with alphabetical ', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(2).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledWith(['alphabetical', 'by']);
    });
  });

  describe('with sortBy prop as frequency', () => {
    let spy;
    let wrapper;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <SuggestedKeywordsPopout
          categories={categories}
          selectedCategory={['wildlife & habitat']}
          sortBy="frequency"
          sortHierarchy="none"
          suggestedKeywords={words}
          onClickUpdate={noop}
          changeSort={spy}
          closeTab={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
        />,
      );
    });
    test('if sortBy prop is not frequency, should render className of selectedSort', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage');
      expect(updatedWrapper.at(1).shallowWithIntl().hasClass('selectedSort')).toBe(true);
      expect(updatedWrapper.at(2).shallowWithIntl().hasClass('selectedSort')).toBe(false);
    });
    test('on frequency text should call changeSort prop ', () => {
      const updatedWrapper = wrapper.find('.rightText FormattedMessage').at(1).shallowWithIntl();
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledWith(['', 'by']);
    });
  });

  describe('with sortHierarchy as none', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        selectedCategory={['wildlife & habitat']}
        sortBy="frequency"
        sortHierarchy="none"
        suggestedKeywords={words}
        onClickUpdate={noop}
        changeSort={spy}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
      />,
    );
    test('onClick of hierarchy text, should call the spy with inc', () => {
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(['inc', 'hierarchy']);
    });
  });

  describe('with sortHierarchy as inc', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        selectedCategory={['wildlife & habitat']}
        sortBy="frequency"
        sortHierarchy="inc"
        suggestedKeywords={words}
        onClickUpdate={noop}
        changeSort={spy}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
      />,
    );
    test('onClick of hierarchy text, should call the spy with dec', () => {
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(['dec', 'hierarchy']);
    });
  });

  describe('with sortHierarchy as dec', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <SuggestedKeywordsPopout
        categories={categories}
        selectedCategory={['wildlife & habitat']}
        sortBy="frequency"
        sortHierarchy="dec"
        suggestedKeywords={words}
        onClickUpdate={noop}
        changeSort={spy}
        closeTab={noop}
        selectedWords={[{ name: 'safety', conditions: 1200 }]}
      />,
    );
    test('onClick of hierarchy text, should call the spy with none', () => {
      const updatedWrapper = wrapper.find('.hierarchy');
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(['none', 'hierarchy']);
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
          selectedCategory={['wildlife & habitat']}
          sortBy="frequency"
          sortHierarchy="dec"
          suggestedKeywords={words}
          onClickUpdate={spy}
          changeSort={noop}
          closeTab={noop}
          selectedWords={[{ name: 'safety', conditions: 1200 }]}
        />,
      );
    });

    test('onClick on not highlighted category (gray), must call onClickUpdate prop', () => {
      const updatedWrapper = wrapper.find('.categories li').first();
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([['wildlife & habitat', 'all'], 'category']);
    });

    test('onClick on highlighted prop, must call on ClickUpdateProp ', () => {
      const updatedWrapper = wrapper.find('.categories li').at(1);
      updatedWrapper.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([[], 'category']);
    });
  });
});

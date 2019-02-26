import React from 'react';
import { shallow } from 'enzyme';
import KeywordList from '.';
import './styles.scss';

const keywords = [
  ['deer', { conditions: 1200, category: ['wildlife & habitat'] }],
  ['alberta', { conditions: 400, category: ['administration & filings'] }],
];
const selectedWords = ['deer'];

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SuggestedKeywordsPopout/KeywordList', () => {
  describe('error testing for props', () => {
    test('if first part of tuple is not a string', () => {
      console.error = jest.fn();
      console.error.mockClear();
      shallow(
        <KeywordList
          selectedWords={selectedWords}
          keywords={[[12, { conditions: 1200, category: ['wildlife & habitat'] }]]}
          onClick={noop}
        />,
      );
      expect(console.error).toHaveBeenCalledTimes(1);
    });
    test('if length of tuple is greater than two', () => {
      console.error = jest.fn();
      console.error.mockClear();
      shallow(
        <KeywordList
          selectedWords={selectedWords}
          keywords={[['deer', { conditions: 1200, category: ['wildlife & habitat'] }, 'test']]}
          onClick={noop}
        />,
      );
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <KeywordList
          selectedWords={selectedWords}
          keywords={keywords}
          onClick={noop}
        />,
      );
    });

    test('if word is selected, should have appropriately styled', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first();
      expect((first).find('Icon').props().icon).toBe('minus-circle');
      expect((first).find('Icon').hasClass('selectedIcon')).toBe(true);
    });

    test('if word is not selected, should have appropriate styles', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last();
      expect((last).find('Icon').props().icon).toBe('plus-circle');
      expect((last).find('Icon').hasClass('regularIcon')).toBe(true);
    });
  });

  describe('onClick for word', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <KeywordList
          selectedWords={selectedWords}
          keywords={keywords}
          onClick={spy}
        />,
      );
    });
    test('onClick on - symbol, must call onClick prop', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first().find('.icon');
      first.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('onClick on + symbol, must call onClick prop', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last().find('.icon');
      last.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

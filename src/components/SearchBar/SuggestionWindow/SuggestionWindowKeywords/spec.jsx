import React from 'react';
import { shallow } from 'enzyme';
import SuggestionWindowKeywords from '.';
import './styles.scss';

const suggestedKeywords = [{
  name: 'safety',
  conditions: 1200,
},
{
  name: 'emissions',
  conditions: 1000,
}, {
  name: 'habitat',
  conditions: 800,
},
{
  name: 'construction',
  conditions: 1000,
},
{
  name: 'habitat',
  conditions: 1000,
},
{
  name: 'file',
  conditions: 1400,
},
{
  name: 'breeding breed',
  conditions: 380,
},
{
  name: 'safety',
  conditions: 1400,
},
{
  name: 'emissions',
  conditions: 1800,
}, {
  name: 'habitat',
  conditions: 1400,
},
{
  name: 'construction',
  conditions: 1001,
},
{
  name: 'habitat',
  conditions: 1300,
},
{
  name: 'file',
  conditions: 1420,
},
{
  name: 'breeding breed',
  conditions: 390,
}];

const selectedWords = [
  {
    name: 'safety',
    conditions: 1200,
  },
];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SuggestionWindow/SuggestionWindowKeywords', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SuggestionWindowKeywords
          selectedWords={selectedWords}
          suggestedKeywords={suggestedKeywords}
          onClickUpdate={noop}
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
        <SuggestionWindowKeywords
          selectedWords={selectedWords}
          suggestedKeywords={suggestedKeywords}
          onClickUpdate={spy}
        />,
      );
    });
    test('onClick on - symbol, must call onClickUpdateProp', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first().find('.icon');
      first.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([[], 'words']);
    });

    test('onClick on + symbol, must call onClickUpdateProp', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last().find('.icon');
      last.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(([], 'words'));
    });
  });
});

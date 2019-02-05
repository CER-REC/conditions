import React from 'react';
import { shallow } from 'enzyme';
import SearchContent from '.';
import { shallowWithIntl, shouldBehaveLikeAComponent } from '../../../tests/utilities';

const keywords = ['access management',
  'condition comp',
  'drinking water',
  'Assiniboine River',
  'department of', 'fracture tough'];

const noop = () => {};

describe('Components|SearchBar/SearchContent', () => {
  describe('', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <SearchContent
          keywords={keywords}
          exceptKeywords={keywords}
          display
          deleteWord={noop}
          addWord={noop}
          closeTab={noop}
        />,
      );
    });
    // test('it should behave like a component', () => {
    //   shouldBehaveLikeAComponent(SearchContent, () => wrapper);
    // });
    test('a className of SearchContent', () => {
      expect(wrapper.find('.SearchContent')).toHaveLength(1);
    });

    test('render input', () => {
      expect(wrapper.find('input').first().hasClass('searchBar')).toBe(true);
    });

    test('render ul list with searchWords className', () => {
      expect(wrapper.find('ul.searchWords').first()).toHaveLength(1);
    });
  });
});

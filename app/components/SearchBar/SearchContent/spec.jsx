import React from 'react';
import SearchContent from '.';
import { shallowWithIntl, shouldBehaveLikeAComponent } from '../../../tests/utilities';

const keywords = ['access management',
  'condition comp',
  'drinking water',
  'Assiniboine River',
  'department of', 'fracture tough'];

// const exceptKeyWords = ['test1', 'test2', 'test3'];

describe('Components|SearchBar/SearchContent', () => {
  describe('', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(
        <SearchContent keywords={keywords} />,
      );
    });
    // test('it should behave like a component', () => {
    //   shouldBehaveLikeAComponent(SearchContent, () => wrapper);
    // });
    // test('a className of SearchContent', () => {
    //   expect(wrapper.find('.SearchContent')).toHaveLength(1);
    // });

    // test('render input', () => {
    //   expect(wrapper.find('input')).toHaveLength(1);
    // });

    // test('render ul list with searchWords className', () => {
    //   expect(wrapper.find('ul.searchWords')).toHaveLength(1);
    // });
  });
});

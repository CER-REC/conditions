import React from 'react';
import { shallowWithIntl } from '../../tests/utilities';
import SearchBar from '.';

// const noop = () => {};
// const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SearchBar', () => {
  describe('default with isSearch set to true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(
        <SearchBar isSearch />,
      );
    });
    test('a className of SearchBar', () => {
      expect(wrapper.find('.SearchBar')).toHaveLength(1);
    });

    test('render findSummary component', () => {
      expect(wrapper.find('SearchContent')).toHaveLength(1);
    });
  });

  describe('default with isSearch set to false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(
        <SearchBar isSearch={false} />,
      );
    });
    test('a className of SearchBar', () => {
      expect(wrapper.find('.SearchBar')).toHaveLength(1);
    });

    test('render filterSummary component', () => {
      expect(wrapper.find('FilterContent')).toHaveLength(1);
    });
  });
});

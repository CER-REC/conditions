import React from 'react';
import { shallow } from 'enzyme';
import SuggestionWindow from '.';
import { shallowWithIntl } from '../../../tests/utilities';

describe('Components|SearchBar/SuggestionWindow', () => {
  describe('', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowWithIntl(
        <SuggestionWindow isFilterTab isActive />,
      );
    });
    test('must render a div', () => {
      // expect(wrapper.find('.Tab')).toHaveLength(1);
    });
  });
});

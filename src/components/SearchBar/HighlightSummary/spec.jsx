import React from 'react';
import { shallow } from 'enzyme';
import HighlightSummary from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const includeKeywords = ['test1', 'test2'];
const excludeKeywords = ['except1', 'except2'];
const selectedYear = { start: 2010, end: 2018 };
const statuses = ['IN_PROGRESS', 'COMPLETED'];

describe('Components|SearchBar/HighlightSummary', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <HighlightSummary
          showFilterSummary={false}
          includeKeywords={[]}
          excludeKeywords={[]}
          selectedYear={selectedYear}
          includedStatuses={statuses}
        />,
      );
    });

    shouldBehaveLikeAComponent(HighlightSummary, () => wrapper);
    test('should not render any text', () => {
      expect(wrapper.find('FormattedMessage')).toHaveLength(0);
    });

    test('should render the filter summary', () => {
      wrapper.setProps({ showFilterSummary: true });
      const formatted = (wrapper).find('FormattedMessage');
      expect(formatted).toHaveLength(1);
      expect(formatted.at(0).props().id).toBe('components.searchBar.highlightSummary.showing');
    });

    test('should render the included keywords', () => {
      wrapper.setProps({ includeKeywords });

      const formatted = (wrapper).find('FormattedMessage');
      expect(formatted).toHaveLength(1);
      expect(formatted.at(0).props().id).toBe('components.searchBar.highlightSummary.includes');

      includeKeywords.forEach(word => expect(wrapper.text()).toMatch(word));
    });

    test('should render the excluded keywords', () => {
      wrapper.setProps({ excludeKeywords });

      const formatted = (wrapper).find('FormattedMessage');
      expect(formatted).toHaveLength(1);
      expect(formatted.at(0).props().id).toBe('components.searchBar.highlightSummary.excludes');

      excludeKeywords.forEach(word => expect(wrapper.text()).toMatch(word));
    });
  });
});

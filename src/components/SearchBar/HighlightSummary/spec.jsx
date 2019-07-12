import React from 'react';
import { shallow } from 'enzyme';
import HighlightSummary from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const keywords = ['test1', 'test2'];
const exceptKeywords = ['except1', 'except2'];
const selectedYear = { start: 2010, end: 2018 };
const statuses = ['IN_PROGRESS', 'COMPLETED'];

describe('Components|SearchBar/HighlightSummary', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <HighlightSummary
          includeKeywords={keywords}
          excludeKeywords={exceptKeywords}
          selectedYear={selectedYear}
          includedStatuses={statuses}
        />,
      );
    });

    shouldBehaveLikeAComponent(HighlightSummary, () => wrapper);
    test('should not render include keywords text if no keywords', () => {
      wrapper.setProps({ includeKeywords: [] });
      const updatedWrapper = (wrapper).find('FormattedMessage').at(1);
      expect(updatedWrapper.props().id).not.toBe('components.searchBar.highlightSummary.includes');
    });
    test('should not render exclude keywords if no exclude keywords', () => {
      wrapper.setProps({ excludeKeywords: [] });
      const updatedWrapper = wrapper.find('FormattedMessage');
      const lastWrapper = updatedWrapper.at(updatedWrapper.length - 1);
      expect(lastWrapper.props().id).not.toBe('components.searchBar.highlightSummary.excludes');
    });
  });
});

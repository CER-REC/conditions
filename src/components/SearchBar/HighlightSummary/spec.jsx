import React from 'react';
import { shallow } from 'enzyme';
import HighlightSummary from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const keywords = ['test1', 'test2'];
const exceptKeywords = ['except1', 'except2'];
const selectedYear = { start: 2010, end: 2018 };

describe('Components|SearchBar/HighlightSummary', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <HighlightSummary
          keywords={keywords}
          exceptKeywords={exceptKeywords}
          selectedYear={selectedYear}
        />,
      );
    });

    shouldBehaveLikeAComponent(HighlightSummary, () => wrapper);
  });
});

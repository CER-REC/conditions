import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import HighlightSummary from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/HighlightSummary', module, ReadMe)
  .add('default', () => (
    <HighlightSummary
      includeKeywords={['include1', 'include2']}
      excludeKeywords={['exclude1', 'exclude2']}
      selectedYear={{ start: 2010, end: 2018 }}
      includedStatuses={['IN_PROGRESS', 'COMPLETED']}
    />
  ));

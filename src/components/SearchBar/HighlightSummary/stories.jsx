import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import HighlightSummary from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/HighlightSummary', module, ReadMe)
  .add('default', () => (
    <HighlightSummary keywords={['test1', 'test2']} exceptKeywords={['except1', 'except2']} selectedYear={{ start: 2010, end: 2018 }} />
  ));

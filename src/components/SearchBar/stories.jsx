import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SearchBar from '.';
import ReadMe from './README.md';

const yearRange = {
  start: 1970,
  end: 1980,
};
const noop = () => {};

const suggestedKeywords = {
  deer: { conditions: 1200, category: ['wildlife & habitat'] },
  alberta: { conditions: 400, category: ['administration & filings'] },
};

const keywords = {
  include: ['include1', 'include2', 'include3'],
  exclude: ['exclude1', 'exclude2', 'exclude2'],
};

const projectStatus = ['OPEN', 'CANCELLED'];

storiesForComponent('Components|SearchBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('Basic Find without SuggestedKeywords', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}

    />
  ))
  .add('Basic Find with SuggestedKeywords', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}

    />
  ))
  .add('Advanced Find without SuggestedKeywords', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}

    />
  ))
  .add('Advanced Find with SuggestedKeywords', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}

    />
  ))
  .add('Filter Selected', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}

    />
  ))
  .add('Both Tabs closed', () => (
    <SearchBar
      yearRange={yearRange}
      availableYearRange={yearRange}
      searchKeywords={keywords}
      updateSearchKeywords={noop}
      suggestedKeywords={suggestedKeywords}
      findAny
      projectStatus={projectStatus}
    />
  ));

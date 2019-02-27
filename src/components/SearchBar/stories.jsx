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
  safety: { conditions: 1200, category: ['administration & filings'] },
  emissions: { conditions: 1000, category: ['environment'] },
  habitat: { conditions: 800, category: ['environment', 'oversight & safety'] },
  construction: { conditions: 1000, category: ['environment'] },
};

const keywords = {
  include: ['safety'],
  exclude: ['emissions'],
};

const availableCategories = ['all', 'oversight & safety', 'environment', 'administration & filings'];

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
      addIncludeKeywords={noop}
      addExcludeKeywords={noop}
      availableCategories={availableCategories}
      projectStatus={projectStatus}
      includeOnChange={noop}
    />
  ));

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SearchBar from '.';
import ReadMe from './README.md';
import { categories } from '../../mockData';

const newSampleSuggestedKeywords = [
  {
    name: 'safety',
    category: ['administration & filings'],
    conditionCount: 1201,
  },
  {
    name: 'emissions',
    category: ['environment'],
    conditionCount: 1001,
  },
  {
    name: 'habitat',
    category: ['environment', 'oversight & safety'],
    conditionCount: 801,
  },
  {
    name: 'construction',
    category: ['environment'],
    conditionCount: 1001,
  },
];

storiesForComponent('Components|SearchBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['findAnyOnChange', 'updateKeywords'] }))
  .addDecorator(withKnobs)
  .add('SearchBar default', () => (
    <SearchBar
      suggestedKeywords={newSampleSuggestedKeywords}
      availableYearRange={{ start: 1970, end: 1980 }}
      availableCategories={categories.availableCategories}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        includeKeywords: ['safety'],
        excludeKeywords: [],
        projectStatus: ['IN_PROGRESS', 'COMPLETED'],
        yearRange: { start: 1970, end: 1980 },
        findAny: true,
      },
      actions: {
        setIncluded: () => words => ({ includeKeywords: words }),
        setExcluded: () => words => ({ excludeKeywords: words }),
        findAnyOnChange: () => e => ({ findAny: e }),
        updateYear: () => selectedYear => ({ yearRange: selectedYear }),
        changeProjectStatus: () => updatedProjectStatus => (
          { projectStatus: updatedProjectStatus }),
      },
    },
  });

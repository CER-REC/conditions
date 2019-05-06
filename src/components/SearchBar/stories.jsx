import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SearchBar from '.';
import ReadMe from './README.md';

const sampleSuggestedKeywords = {
  safety: { conditions: 1200, category: ['administration & filings'] },
  emissions: { conditions: 1000, category: ['environment'] },
  habitat: { conditions: 800, category: ['environment', 'oversight & safety'] },
  construction: { conditions: 1000, category: ['environment'] },
};

storiesForComponent('Components|SearchBar', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['findAnyOnChange', 'updateKeywords'] }))
  .addDecorator(withKnobs)
  .add('SearchBar default', () => (
    <SearchBar
      suggestedKeywords={sampleSuggestedKeywords}
      availableYearRange={{ start: 1970, end: 1980 }}
      availableCategories={['all', 'oversight & safety', 'environment', 'administration & filings']}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        includeKeywords: ['safety'],
        excludeKeywords: [],
        projectStatus: ['INPROGRESS', 'COMPLETED'],
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

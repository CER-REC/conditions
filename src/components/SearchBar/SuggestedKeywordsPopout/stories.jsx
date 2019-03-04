import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestedKeywordsPopout from '.';
import ReadMe from './README.md';

const keywords = {
  deer: { conditions: 1200, category: ['wildlife & habitat'] },
  alberta: { conditions: 400, category: ['administration & filings'] },
};

storiesForComponent('Components|SearchBar/SuggestedKeywordsPopout', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setIncluded', 'setExcluded', 'closeTab'] }))
  .add('with interaction', () => (
    <SuggestedKeywordsPopout
      isExclude={false}
      suggestedKeywords={keywords}
      categories={['all', 'wildlife & habitat', 'environment', 'engineering & structures', 'administration & filings']}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        includeKeywords: ['deer'],
        excludeKeywords: [],
      },
      actions: {
        setIncluded: () => words => ({ includeKeywords: words }),
        setExcluded: () => words => ({ excludeKeywords: words }),
      },
    },
  });

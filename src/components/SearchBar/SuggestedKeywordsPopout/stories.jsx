import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestedKeywordsPopout from '.';
import ReadMe from './README.md';
import { categories } from '../../../mockData';

const newKeywords = [
  {
    name: 'deer',
    category: ['wildlife & habitat'],
    conditionCount: 1300,
  },
  {
    name: 'alberta',
    category: ['administration & filing'],
    conditionCount: 500,
  },
];

storiesForComponent('Components|SearchBar/SuggestedKeywordsPopout', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['setIncluded', 'setExcluded', 'closeTab'] }))
  .add('with interaction', () => (
    <SuggestedKeywordsPopout
      isExclude={false}
      suggestedKeywords={newKeywords}
      categories={categories.availableCategories}
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

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
  .addDecorator(withInteraction({ actions: ['onClick', 'closeTab'] }))
  .add('with interaction', () => (
    <div>
      <SuggestedKeywordsPopout
        {...getInteractionProps()}
      />
    </div>
  ), {
    interaction: {
      state: {
        categories: ['all', 'wildlife & habitat', 'environment', 'engineering & structures', 'administration & filings'],
        selectedWords: ['deer'],
        suggestedKeywords: keywords,
      },
      actions: {
        onClick: () => ([updatedList]) => ({ selectedWords: updatedList }),
      },
    },
  });

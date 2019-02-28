import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SearchContent from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SearchContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['changeSearchType', 'updateKeywords', 'closeTab', 'includeOnChange'] }))
  .add('with interaction', () => (
    <SearchContent
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        includeKeywords: [], excludeKeywords: [], findAny: true,
      },
      actions: {
        updateKeywords: () => (words, type) => ((type === 'include') ? { includeKeywords: words } : { excludeKeywords: words }),
        findAnyOnChange: () => e => ({ findAny: e }),
      },
    },
  });

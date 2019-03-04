import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SearchContent from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SearchContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: [
      'setIncluded', 'setExcluded', 'closeTab', 'findAnyOnChange',
      'changeIsExclude'],
  }))
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
        setIncluded: () => words => ({ includeKeywords: words }),
        setExcluded: () => words => ({ excludeKeywords: words }),
        findAnyOnChange: () => e => ({ findAny: e }),
      },
    },
  });

import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../../.storybook/utils';
import KeywordList from '.';
import ReadMe from './README.md';

const words = [
  ['deer', { conditions: 1200, category: ['wildlife & habitat'] }],
  ['alberta', { conditions: 400, category: ['administration & filings'] }],
];

storiesForComponent('Components|SearchBar/SuggestedKeywordsPopout/KeywordList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onClick'] }))
  .add('default', () => (
    <KeywordList
      selectedWords={['deer', 'alberta']}
      keywords={words}
      {...getInteractionProps()}
    />
  ));

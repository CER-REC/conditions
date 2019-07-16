import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../../.storybook/utils';
import KeywordList from '.';
import ReadMe from './README.md';

const words = [{
  name: 'deer',
  category: ['wildlife & habitat'],
  conditionCount: 1200,
},
{
  name: 'alberta',
  category: ['administration & filings'],
  conditionCount: 400,
},
];

storiesForComponent('Components|SearchBar/SuggestedKeywordsPopout/KeywordList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['setIncluded', 'setExcluded'] }))
  .add('default', () => (
    <KeywordList
      includeKeywords={['deer']}
      excludeKeywords={[]}
      isExclude={false}
      keywords={words}
      {...getInteractionProps()}
    />
  ));

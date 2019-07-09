import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewOneUnconnected } from '.';

import keywords from '../../components/ConditionExplorer/mockKeywords';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

storiesForView('Containers|ViewOne', module, ReadMe)
  .addDecorator(
    withInteraction({
      actions: {
        setSelectedKeyword: () => (keyword, id) => (
          { selected: { keywordId: id } }
        ),
      },
      state: {
        selected: {
          selectedKeywordId: null,
        },
      },
    }),
  )
  .add('default', () => (
    <ViewOneUnconnected
      allKeywords={uniqueKeywords}
      jumpToAbout={noop}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ))
  .add('layout only', () => (
    <ViewOneUnconnected
      layoutOnly
      allKeywords={uniqueKeywords}
      jumpToAbout={noop}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ));

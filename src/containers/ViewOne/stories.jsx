import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewOne from '.';

import keywords from '../../components/ConditionExplorer/mockKeywords.json';

const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const noop = () => {};

storiesForView('Containers|ViewOne', module, ReadMe)
  .addDecorator(
    withInteraction({
      actions: {
        // TODO: Fix this once ConditionExplorer's story has been updated
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
    <ViewOne
      allKeywords={uniqueKeywords}
      jumpToAbout={noop}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ))
  .add('layout only', () => (
    <ViewOne
      layoutOnly
      allKeywords={uniqueKeywords}
      jumpToAbout={noop}
      beginTutorial={noop}
      {...getInteractionProps()}
    />
  ));

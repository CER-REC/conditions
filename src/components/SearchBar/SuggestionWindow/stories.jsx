import React from 'react';
import { forceReRender } from '@storybook/react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SuggestionWindow from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SuggestionWindow', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: {
      categories: ['all', 'wildlife & habitat', 'environment', 'engineering & structures', 'administration & filings'],
      selectedCategory: ['wildlife & habitat'],
      sortBy: '',
      sortHierarchy: 'none',
      selectedWords: [{
        name: 'safety',
        conditions: 1200,
      },
      {
        name: 'emissions',
        conditions: 1000,
      }, {
        name: 'habitat',
        conditions: 800,
      }],
      suggestedKeywords: [{
        name: 'safety',
        conditions: 1200,
      },
      {
        name: 'emissions',
        conditions: 1000,
      }, {
        name: 'habitat',
        conditions: 800,
      },
      {
        name: 'construction',
        conditions: 1000,
      },
      {
        name: 'habitat',
        conditions: 1000,
      },
      {
        name: 'file',
        conditions: 1400,
      },
      {
        name: 'breeding breed',
        conditions: 380,
      },
      {
        name: 'safety',
        conditions: 1400,
      },
      {
        name: 'emissions',
        conditions: 1800,
      }, {
        name: 'habitat',
        conditions: 1400,
      },
      {
        name: 'construction',
        conditions: 1001,
      },
      {
        name: 'habitat',
        conditions: 1300,
      },
      {
        name: 'file',
        conditions: 1420,
      },
      {
        name: 'breeding breed',
        conditions: 390,
      }],
    },
    actions: {
      // NOTE: Storybook seems to have issue with re-rendering after state change
      onClickUpdate: () => (obj) => {
        const [updatedList, type] = obj;
        if (type === 'category') {
          forceReRender();
          return ({ selectedCategory: updatedList });
        }
        forceReRender();
        return ({ selectedWords: updatedList });
      },
      changeSort: () => (obj) => {
        const [sort, type] = obj;
        if (type === 'by') {
          forceReRender();
          return ({ sortBy: sort });
        }
        forceReRender();
        return ({ sortHierarchy: sort });
      },
    },
  }))
  .add('default', () => (
    <SuggestionWindow
      {...getInteractionProps()}
      closeTab={() => alert('clicked')}
    />
  ));

import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { forceReRender } from '@storybook/react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import FilterContent from '.';
import ReadMe from './README.md';

const initialYearRange = {
  start: 1970,
  end: 1980,
};

const yearSelected = {
  start: 1970,
  end: 1980,
};

storiesForComponent('Components|SearchBar/FilterContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: ['changeProjectStatus', 'reset', 'onYearSelect', 'closeTab'],
  }))
  .add('with interaction', () => (
    <FilterContent
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        projectStatus: ['OPEN', 'CLOSED', 'CANCELLED'], selectedYear: yearSelected, yearRange: initialYearRange,
      },
      actions: {
        changeProjectStatus: ({ projectStatus: prev }) => item => ({
          projectStatus: prev.includes(item) ? prev.filter(v => v !== item) : prev.concat(item),
        }),
        reset: () => () => {
          return { projectStatus: ['OPEN', 'CLOSED', 'CANCELLED'], selectedYear: initialYearRange };
        },
        onYearSelect: () => (selectedYear) => {
          return ({ selectedYear });
        },
      },
    },
  })
  .add('withProjectStatus', () => (
    <FilterContent
      projectStatus={['CLOSED', 'OPEN']}
      selectedYear={{ start: 1970, end: 1971 }}
      yearRange={initialYearRange}
      {...getInteractionProps()}
    />
  ))
  .add('withYear', () => (
    <FilterContent
      projectStatus={[]}
      {...getInteractionProps()}
      selectedYear={yearSelected}
      yearRange={initialYearRange}
    />
  ));

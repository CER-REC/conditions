import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import FilterContent from '.';
import ReadMe from './README.md';

const allProjectStatuses = ['INPROGRESS', 'COMPLETED'];
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
    actions: ['changeProjectStatus', 'onYearSelect', 'closeTab'],
  }))
  .add('with interaction', () => (
    <FilterContent
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        projectStatus: allProjectStatuses, selectedYear: yearSelected, yearRange: initialYearRange,
      },
      actions: {
        changeProjectStatus: () => updatedProjectStatus => (
          { projectStatus: updatedProjectStatus }),
        onYearSelect: () => selectedYear => ({ selectedYear }),
      },
    },
  })
  .add('withProjectStatus', () => (
    <FilterContent
      projectStatus={allProjectStatuses}
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

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

const noop = () => {};

storiesForComponent('Components|SearchBar/FilterContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: ['changeProjectStatus', 'reset', 'onYearSelect'],
  }))
  .add('with interaction', () => (
    <FilterContent
      {...getInteractionProps()}
      closeTab={() => alert('clicked')}
    />
  ), {
    interaction: {
      state: {
        projectStatus: ['OPEN', 'CLOSED', 'CANCELLED'], selectedYear: yearSelected, yearRange: initialYearRange,
      },
      actions: {
        // NOTE: forceReRender() used because storybook experienced
        // issues re-rendering after state change
        changeProjectStatus: state => (item) => {
          const { projectStatus: updateProject } = state;
          const index = (updateProject.indexOf(item) > -1) ? updateProject.indexOf(item) : null;
          if (index === null) {
            updateProject.push(item);
            forceReRender();
            return { projectStatus: updateProject };
          }
          updateProject.splice(index, 1);
          forceReRender();
          return { projectStatus: updateProject };
        },
        reset: () => () => {
          forceReRender();
          return { projectStatus: ['OPEN', 'CLOSED', 'CANCELLED'], selectedYear: initialYearRange };
        },
        onYearSelect: () => (selectedYear) => {
          forceReRender();
          return ({ selectedYear });
        },
      },
    },
  })
  .add('withProjectStatus', () => (
    <FilterContent
      projectStatus={['CLOSED', 'OPEN']}
      selectedYear={yearSelected}
      yearRange={initialYearRange}
      changeProjectStatus={noop}
      onYearSelect={noop}
      reset={noop}
      closeTab={noop}
    />
  ))
  .add('withYear', () => (
    <FilterContent
      projectStatus={[]}
      onYearSelect={noop}
      reset={noop}
      closeTab={noop}
      changeProjectStatus={noop}
      selectedYear={yearSelected}
      yearRange={initialYearRange}
    />
  ));

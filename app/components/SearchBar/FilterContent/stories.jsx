import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { forceReRender } from '@storybook/react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import FilterContent from '.';
import ReadMe from './README.md';

const yearRange = {
  start: 70,
  end: 80,
};
const noop = () => {};

storiesForComponent('Components|SearchBar/FilterContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    state: {
      display: true, projectStatus: [], selectedYear: [],
    },
    actions: {
      closeTab: () => () => ({ display: false }),
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
        return { projectStatus: [], selectedYear: [] };
      },
      onDragMove: state => (event) => {
        const li = event.target.closest('li');
        const nodes = Array.from(li.closest('ul').children);
        const index = nodes.indexOf(li);
        let { selectedYear } = state;
        if (selectedYear.indexOf(index) === -1) {
          selectedYear.push(index);
          selectedYear = selectedYear.sort((a, b) => a - b);
          const startingNum = selectedYear[0];
          const finishingNum = selectedYear[selectedYear.length - 1];
          for (let i = startingNum; i <= finishingNum; i += 1) {
            if (selectedYear.indexOf(i) <= -1) {
              selectedYear.push(i);
            }
          }
          selectedYear = selectedYear.sort((a, b) => a - b);
        }
        forceReRender();
        return ({ selectedYear });
      },
      yearSelect: () => year => ({ selectedYear: year }),
      onYearKeyPress: state => (object) => {
        const { array, direction } = object;
        const { selectedYear } = state;
        const lastIndex = selectedYear[selectedYear.length - 1];
        const firstIndex = selectedYear[0];
        if (direction === 1) {
          if (array[lastIndex + 1] !== undefined) {
            selectedYear.push(lastIndex + 1);
          }
        } else if (direction === -1) {
          if (array[firstIndex - 1] !== undefined) {
            selectedYear.push(firstIndex - 1);
          }
        }
        selectedYear.sort((a, b) => a - b);
        forceReRender();
        return ({ selectedYear });
      },
    },
  }))
  .add('with interaction', () => (
    <FilterContent
      {...getInteractionProps()}
      yearRange={yearRange}
    />
  ))
  .add('withProjectStatus', () => (
    <FilterContent
      projectStatus={['CLOSED', 'OPEN']}
      selectedYear={[]}
      display={getInteractionProps().display}
      yearRange={yearRange}
      changeProjectStatus={noop}
      onDragMove={noop}
      reset={noop}
      closeTab={noop}
      yearSelect={noop}
      onYearKeyPress={noop}
    />
  ))
  .add('withYear', () => (
    <FilterContent
      {...getInteractionProps()}
      display={getInteractionProps().display}
      selectedYear={[0, 1, 2, 3]}
      yearRange={yearRange}
    />
  ));

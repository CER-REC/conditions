import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withGQL from '../../../.storybook/addon-graphql';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewTwoUnconnected, ViewTwoGraphQL } from '.';
import { searchData, conditionData, projectsData } from '../../mockData';

const noop = () => {};

const year = {
  start: 1970,
  end: 1980,
};
const categories = ['all', 'wildlife & habitat'];

const props = {
  projectsData,
  availableProjectYear: { year },
  availableCategories: { categories },
  suggestedKeywords: { searchData },
  conditionDetails: {
    selectedProject: 'Project Name',
    data: conditionData,
  },
  browseBy: 'company',
  jumpToView3: noop,
};

storiesForView('Containers|ViewTwo', module, ReadMe)
  .addDecorator(
    withInteraction({
      actions: {
        selectRay: () => () => ({}),
        setFindAny: () => e => ({ findAny: e }),
        setProjectYear: () => selectedYear => ({ projectYear: selectedYear }),
        setProjectStatus: () => status => ({ projectStatus: status }),
        setIncluded: () => words => ({ included: words }),
        setExcluded: () => words => ({ excluded: words }),
        setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature } }),
        setSelectedCondition: ({ selected }) => selectedCondition => ({
          selected: { ...selected, condition: selectedCondition },
        }),
        setSelectedProject: ({ selected }) => project => ({ selected: { ...selected, project } }),
        openIntermediatePopup: () => () => ({}),
        openProjectDetails: () => () => ({}),
      },
      state: {
        included: [],
        excluded: [],
        projectStatus: ['IN_PROGRESS', 'COMPLETED'],
        projectYear: year,
        findAny: true,
        selected: {
          feature: 'theme',
          condition: { instrumentIndex: 0, itemIndex: 0 },
          project: 1225,
        },
      },
    }),
  )
  .add('default', () => <ViewTwoUnconnected {...props} {...getInteractionProps()} />)
  .add('location', () => <ViewTwoUnconnected {...props} browseBy="location" {...getInteractionProps()} />)
  .add(
    'connected variant', () => <ViewTwoGraphQL {...props} {...getInteractionProps()} />,
    { decorators: [withGQL] },
  )
  .add('layout only', () => (
    <ViewTwoUnconnected layoutOnly {...props} {...getInteractionProps()} />
  ));

import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewTwoUnconnected } from '.';
import { searchData, conditionData, projectsData } from '../../mockData';

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
};

storiesForView('Containers|ViewTwo', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setBrowseBy: () => browseBy => ({ browseBy }),
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
      browseBy: 'company',
      included: [],
      excluded: [],
      projectStatus: ['OPEN'],
      projectYear: year,
      findAny: true,
      selected: {
        feature: 'theme',
        condition: { instrumentIndex: 0, itemIndex: 0 },
        project: 1225,
      },
    },
  }))
  .add('default', () => (
    <ViewTwoUnconnected
      {...props}
      {...getInteractionProps()}
    />
  ))
  .add('layout only', () => (
    <ViewTwoUnconnected
      layoutOnly
      {...props}
      {...getInteractionProps()}
    />
  ));

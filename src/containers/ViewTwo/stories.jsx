import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewTwoUnconnected } from '.';
import { searchData, conditionData } from '../../mockData';

const year = {
  start: 1970,
  end: 1980,
};
const categories = ['all', 'wildlife & habitat'];

const props = {
  availableProjectYear: { year },
  availableCategories: { categories },
  suggestedKeywords: { searchData },
  conditionDetails: {
    searchKeywords: {
      include: ['hello'],
    },
    selectedProject: 'Project Name',
    data: conditionData,
  },
};

const pendingActions = ['openIntermediatePopup', 'openProjectDetails'].reduce((acc, next) => ({
  [next]: () => () => ({}),
  ...acc,
}), {});

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
      ...pendingActions,
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
      },
    },
  }))
  .add('default', () => (
    <ViewTwoUnconnected
      {...props}
      {...getInteractionProps()}
    />
  ))
  .add('layout only', () => <ViewTwoUnconnected layoutOnly {...props} {...getInteractionProps()} />);

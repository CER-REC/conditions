import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewTwoUnconnected } from '.';
import { searchData } from '../../mockData';

const year = {
  start: 1970,
  end: 1980,
};
const categories = ['all', 'wildlife & habitat'];

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
      },
    },
  }))
  .add('default', () => (
    <ViewTwoUnconnected
      availableProjectYear={year}
      availableCategories={categories}
      suggestedKeywords={searchData}
      {...getInteractionProps()}
    />
  ))
  .add('layout only', () => <ViewTwoUnconnected layoutOnly {...getInteractionProps()} />);

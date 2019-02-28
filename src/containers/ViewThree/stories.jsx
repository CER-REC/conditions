import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewThreeRaw } from '.';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';

// TODO: Connect ConditionDetails to the external view once it's been normalized
import conditionDetailsData from '../../components/ConditionDetails/testData';
const conditionDetailsCallbacks = {
  updateSelectedItem: () => (instrumentIndex, itemIndex) => (
    { selectedItem: { instrumentIndex, itemIndex } }
  ),
  toggleExpanded: () => expand => ({ expanded: expand }),
};


const props = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  selected: {
    feature: 'theme',
    subFeature: '',
  },
  conditionDetails: {
    isExpandable: true,
    expanded: true,
    searchKeywords: {
      include: ['hello'],
    },
    selectedProject: 'Keystone XL',
    data: conditionDetailsData,

  },
};

storiesForView('Containers|ViewThree', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature, subFeature: '' } }),
      setSelectedSubFeature: ({ selected }) => subFeature => ({
        selected: { ...selected, subFeature },
      }),
      ...conditionDetailsCallbacks,
    },
    state: { selected: { feature: 'theme', subFeature: '' } },
  }))
  .add('default', () => <ViewThreeRaw {...props} {...getInteractionProps()} />)
  .add('layout only', () => <ViewThreeRaw {...props} {...getInteractionProps()} layoutOnly />);

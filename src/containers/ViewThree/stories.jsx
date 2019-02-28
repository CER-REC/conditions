import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewThreeRaw } from '.';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';

// TODO: Connect ConditionDetails to the external view once it's been normalized
import conditionDetailsData from '../../components/ConditionDetails/testData';

const props = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  selected: {
    feature: 'theme',
    subFeature: '',
  },
  conditionDetails: {
    isExpandable: true,
    searchKeywords: {
      include: ['hello'],
    },
    selectedProject: 'Keystone XL',
    selectedItem: {
      instrumentIndex: 0,
      itemIndex: 0,
    },
    data: conditionDetailsData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
  detailView: false,
};

const pendingActions = ['updateSelectedItem', 'openIntermediatePopup', 'openProjectDetails'].reduce((acc, next) => ({
  [next]: () => () => ({}),
  ...acc,
}), {});

storiesForView('Containers|ViewThree', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature, subFeature: '' } }),
      setSelectedSubFeature: ({ selected }) => subFeature => ({
        selected: { ...selected, subFeature },
      }),
      expandDetailView: () => toggleTo => ({ detailView: toggleTo }),
      ...pendingActions,
      setBubbleChartIndicator: ({ chartIndicatorPosition }) => bubble => (
        { chartIndicatorPosition: { ...chartIndicatorPosition, bubble } }
      ),
    },
   state: { selected: { feature: 'theme', subFeature: '' }, chartIndicatorPosition: { bubble: 'XO', stream: 2010 } },
  }))
  .add('default', () => <ViewThreeRaw {...props} {...getInteractionProps()} />)
  .add('layout only', () => <ViewThreeRaw {...props} {...getInteractionProps()} layoutOnly />);

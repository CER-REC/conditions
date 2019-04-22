import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView, withStyles } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewThreeRaw } from '.';
import { conditionCountsByYear, conditionCountsByCommodity, conditionData } from '../../mockData';

const props = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  conditionDetails: {
    selectedProject: 'Project Name',
    data: conditionData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
};

const pendingActions = ['openIntermediatePopup', 'openProjectDetails'].reduce((acc, next) => ({
  [next]: () => () => ({}),
  ...acc,
}), {});

storiesForView('Containers|ViewThree', module, ReadMe)
  .addDecorator(withStyles(`
    .ViewThree { height: 90vh }
  `))
  .addDecorator(withInteraction({
    actions: {
      setSelectedFeature: ({ selected }) => feature => ({
        selected: { ...selected, feature, subFeature: '' },
      }),
      setSelectedSubFeature: ({ selected }) => subFeature => ({
        selected: { ...selected, subFeature },
      }),
      setSelectedCondition: ({ selected }) => selectedCondition => ({
        selected: { ...selected, condition: selectedCondition },
      }),
      expandDetailView: ({ detailViewExpanded }) => () => ({
        detailViewExpanded: !detailViewExpanded,
      }),
      setBubbleChartIndicator: ({ chartIndicatorPosition }) => bubble => (
        { chartIndicatorPosition: { ...chartIndicatorPosition, bubble } }
      ),
      ...pendingActions,
    },
    state: {
      included: [],
      excluded: [],
      selected: {
        feature: 'theme',
        subFeature: '',
        condition: { instrumentIndex: 0, itemIndex: 0 },
      },
      chartIndicatorPosition: { bubble: 'XO', stream: 2010 },
      detailViewExpanded: false,
    },
  }))
  .add('default', () => <ViewThreeRaw {...props} {...getInteractionProps()} />)
  .add('layout only', () => <ViewThreeRaw {...props} {...getInteractionProps()} layoutOnly />);

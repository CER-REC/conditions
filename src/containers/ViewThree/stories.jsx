import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView, withStyles } from '../../../.storybook/utils';

import ReadMe from './README.md';
import ViewThree, { ViewThreeUnconnected } from '.';
import { conditionCountsByYear, conditionCountsByCommodity, conditionData, displayOrder } from '../../mockData';

const props = {
  conditionCountsByYear,
  years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  conditionCountsByCommodity,
  conditionDetails: {
    selectedProject: 'Project Name',
    data: conditionData,
  },
  chartIndicatorPosition: {
    bubble: 'XO',
    stream: 2010,
  },
  displayOrder,
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
      detailViewExpanded: true,
    },
  }))
  .add('default', () => <ViewThree {...props} {...getInteractionProps()} />)
  .add('layout only', () => <ViewThreeUnconnected {...props} {...getInteractionProps()} layoutOnly />);

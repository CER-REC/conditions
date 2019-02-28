import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import { ViewThreeRaw } from '.';
import { conditionCountsByYear, conditionCountsByCommodity } from '../../mockData';

const props = {
  conditionCountsByYear,
  conditionCountsByCommodity,
  selected: {
    feature: 'theme',
    subFeature: '',
  },
};

storiesForView('Containers|ViewThree', module, ReadMe)
  .addDecorator(withInteraction({
    actions: {
      setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature, subFeature: '' } }),
      setSelectedSubFeature: ({ selected }) => subFeature => ({
        selected: { ...selected, subFeature },
      }),
      setSelectedIndicator: ({ selected }) => indicator => (
        { selected: { ...selected, indicator } }
      ),
    },
    state: { selected: { feature: 'theme', subFeature: '', indicator: '' } },
  }))
  .add('default', () => <ViewThreeRaw {...props} {...getInteractionProps()} />)
  .add('layout only', () => <ViewThreeRaw {...props} {...getInteractionProps()} layoutOnly />);

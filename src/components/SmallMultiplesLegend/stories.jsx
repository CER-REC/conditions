import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import SmallMultiplesLegend from '.';
import ReadMe from './README.md';
import { conditionCountsByYear, displayOrder } from '../../mockData';

const props = {
  allConditionsPerYear: conditionCountsByYear,
  displayOrder,
  feature: 'theme',
  selected: '',
};

storiesForComponent('Components|SmallMultiplesLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .add('basic usage', () => (
    <SmallMultiplesLegend
      {...props}
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      actions: { onChange: () => subFeature => ({ selected: subFeature }) },
      state: { selected: '' },
    },
  })
  .add('selected', () => (
    <SmallMultiplesLegend
      {...props}
      {...getInteractionProps()}
      selected="SECURITY"
    />
  ))
  .add('highlight', () => (
    <SmallMultiplesLegend
      {...props}
      {...getInteractionProps()}
      highlightName="SECURITY"
    />
  ));

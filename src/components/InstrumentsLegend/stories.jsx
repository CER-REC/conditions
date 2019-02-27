import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import { conditionCountsByCommodity } from '../../mockData';
import InstrumentsLegend from '.';
import ReadMe from './README.md';

const props = {
  data: conditionCountsByCommodity.counts,
  selected: '',
};

storiesForComponent('Components|InstrumentsLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({
    actions: {
      onChange: () => subFeature => ({
        selected: subFeature,
      }),
    },
    state: { selected: '' },
  }))
  .add('basic usage', () => (
    <InstrumentsLegend
      {...props}
      {...getInteractionProps()}
    />
  ));

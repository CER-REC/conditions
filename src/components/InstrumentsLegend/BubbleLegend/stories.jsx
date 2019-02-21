import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import BubbleChart from '.';

const options = {
  range: true,
  min: 1000,
  max: 1600,
  step: 5,
};

storiesForComponent('Components|InstrumentsLegend/BubbleLegend', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <BubbleChart
      className="BubbleLegend"
      maxConditions={number('conditions', 1600, options)}
      radiusOfMaxBubble={100}
    />
  ));

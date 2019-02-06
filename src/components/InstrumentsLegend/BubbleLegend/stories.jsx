import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import BubbleChart from '.';

storiesForComponent('Components|InstrumentsLegend/BubbleLegend', module, ReadMe)
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .add('default', () => (
    <BubbleChart className="BubbleLegend" />
  ));

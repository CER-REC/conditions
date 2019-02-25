import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import Streamgraph from '.';
import ReadMe from './README.md';

import { conditionCountsByYear } from '../../mockData';

const chartTitle = 'Themes Across All Conditions';

storiesForComponent('Components|StreamGraph', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('With interaction', () => (
    <Streamgraph
      projectData={conditionCountsByYear.counts}
      chartTitle={chartTitle}
    />
  ));

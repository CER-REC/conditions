import React from 'react';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import Details from '.';
import ReadMe from './README.md';

const data = {
  theme: ['ADMINISTRATIVE', 'ENFORCEMENT', 'SUNSET_CLAUSE'],
  instrument: 'instrument.CONSTRUCTION',
  phase: 'phase.DURING_CONSTRUCTION_PHASE',
  type: 'type.STANDARD',
  status: 'status.IN_PROGRESS',
  filing: 'filing.REQUIRED',
};

storiesForComponent('Components|ConditionDetails/Details', module, ReadMe)
  .addDecorator(withStyles(`
    .ConditionDetails { position: relative; }
    .Details { position: relative; }
  `))
  .add('default', () => (
    <Details
      data={data}
    />
  ));

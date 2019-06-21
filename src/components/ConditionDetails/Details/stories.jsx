import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Details from '.';
import ReadMe from './README.md';

const data = {
  theme: ['ADMINISTRATIVE', 'ENFORCEMENT', 'SUNSET_CLAUSE'],
  instrument: 'instrument.CONSTRUCTION',
  phase: 'phase.DURING_CONSTRUCTION_PHASE',
  type: 'type.STANDARD',
  status: 'status.IN_PROGRESS',
  filing: 'status.NO_FILING_REQUIRED',
};

storiesForComponent('Components|ConditionDetails/Details', module, ReadMe)
  .add('default', () => (
    <Details
      data={data}
    />
  ));

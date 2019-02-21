import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import Details from '.';
import ReadMe from './README.md';

const defaultProps = {
  theme: 'theme.environmentalProtection',
  instrument: 'instrument.category.construction',
  phase: 'phase.duringConstruction',
  type: 'type.standard',
  status: 'status.inProgress',
  filing: 'status.noFilingReq',
};

storiesForComponent('Components|ConditionDetails/Details', module, ReadMe)
  .add('default', () => (
    <Details
      {...defaultProps}
    />
  ));

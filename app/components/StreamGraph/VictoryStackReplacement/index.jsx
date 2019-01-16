import React from 'react';
import PropTypes from 'prop-types';
import { VictoryStack } from 'victory';
import StackGroup from '../StackGroup';

const VictoryStackReplacement = ({ groupProps, ...props }) => (
  <VictoryStack
    groupComponent={<StackGroup {...groupProps} stackProps={props} />}
    {...props}
  />
);

export default VictoryStackReplacement;


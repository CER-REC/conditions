import React from 'react';
import PropTypes from 'prop-types';
import { VictoryStack } from 'victory';
import StackGroup from '../StackGroup';

import './styles.scss';

const StackGroupProps = ({ groupProps, ...props }) => (
  <VictoryStack
    groupComponent={<StackGroup {...groupProps} stackProps={props} />}
    {...props}
  />
);

export default StackGroupProps;


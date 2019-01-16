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

StackGroupProps.propTypes = {
  groupProps: PropTypes.objectOf({
    onChange: PropTypes.func.isRequired,
    controlYear: PropTypes.number,
    ProjectData: PropTypes.arrayOf(PropTypes.shape({
      graphData: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};

export default StackGroupProps;


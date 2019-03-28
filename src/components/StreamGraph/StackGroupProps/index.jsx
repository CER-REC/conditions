import React from 'react';
import PropTypes from 'prop-types';
import { VictoryStack } from 'victory';
import StackGroup from '../StackGroup';
import { allConditionsPerYear } from '../../../proptypes';

const StackGroupProps = ({ groupProps, allThemes, ...props }) => (
  <VictoryStack
    groupComponent={<StackGroup {...groupProps} allThemes={allThemes} stackProps={props} />}
    {...props}
  />
);

StackGroupProps.propTypes = {
  groupProps: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    controlYear: PropTypes.number,
    projectData: allConditionsPerYear.isRequired,
  }).isRequired,
  allThemes: PropTypes.bool,
};

StackGroupProps.defaultProps = {
  allThemes: false,
};

export default StackGroupProps;

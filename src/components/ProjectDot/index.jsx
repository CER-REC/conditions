import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const ProjectDot = ({ cx, cy, r, filtered, relevant }) => (
  <circle
    className={classNames('ProjectDot', { Filtered: filtered, Relevant: relevant })}
    cx={cx}
    cy={cy}
    r={r}
  />
);

ProjectDot.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  filtered: PropTypes.bool,
  relevant: PropTypes.bool,
};

ProjectDot.defaultProps = {
  filtered: false,
  relevant: false,
};

export default ProjectDot;

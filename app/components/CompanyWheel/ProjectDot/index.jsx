import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const ProjectDot = ({ filtered, relevant }) => (
  <circle
    className={classNames('ProjectDot', filtered ? 'IsFiltered' : '', relevant ? 'IsRelevant' : '')}
    cx="50"
    cy="50"
    r="40"
  />
);


ProjectDot.propTypes = {
  filtered: PropTypes.bool,
  relevant: PropTypes.bool,
};

ProjectDot.defaultProps = {
  filtered: false,
  relevant: false,
};

export default ProjectDot;

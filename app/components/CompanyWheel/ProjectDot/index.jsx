import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const ProjectDot = props => <circle className={classNames('ProjectDot', props.className)} cx="50" cy="50" r="40" />;


ProjectDot.propTypes = {
  className: PropTypes.string,
};

ProjectDot.defaultProps = {
  className: '',
};

export default ProjectDot;

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ProjectDot = ({ nameOfCssClass }) => {
  const evaluatedCssClass = nameOfCssClass ? `projectDot ${nameOfCssClass}` : 'projectDot';
  return <circle className={evaluatedCssClass} cx="50" cy="50" r="40" />;
};

ProjectDot.propTypes = {
  nameOfCssClass: PropTypes.oneOf(['isFiltered', 'isRelevant', null]),
};

ProjectDot.defaultProps = {
  nameOfCssClass: null,
};

export default ProjectDot;

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ProjectLegend = (props) => {
  console.log(props.legendItems);
  return (
    <div className="ProjectLegend" />
  );
};

ProjectLegend.propTypes = {
  legendItems: PropTypes.arrayOf([
    PropTypes.shape({
      displayItem: PropTypes.node.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default ProjectLegend;

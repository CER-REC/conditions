import React from 'react';
import PropTypes from 'prop-types';

const ProjectLegend = (props) => {
  // TODO: Change this to virtualized legend
  if (props.items.length === 0) { return null; }
  return (
    <div className="ProjectLegend">
      test
    </div>
  );
};

ProjectLegend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
};

ProjectLegend.defaultProps = {
  items: [],
};

export default ProjectLegend;

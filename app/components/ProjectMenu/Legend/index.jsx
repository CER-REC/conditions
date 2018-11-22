import React from 'react';
import PropTypes from 'prop-types';

const Legend = (props) => {
  // TODO: Change this to virtualized legend
  if (props.items.length === 0) { return null; }
  return (
    <div className="Legend">
      legendItems
    </div>
  );
};

Legend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
};

Legend.defaultProps = {
  items: [],
};

export default Legend;

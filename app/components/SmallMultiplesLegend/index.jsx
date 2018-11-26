import React from 'react';
import PropTypes from 'prop-types';

const SmallMultiplesLegend = (props) => {
  return (
    <div>
      <span>{props.title}</span>
      <span>[TODO: Change to vertical list]</span>
    </div>
  );
};

SmallMultiplesLegend.propTypes = {
  title: PropTypes.string.isRequired,
};

SmallMultiplesLegend.defaultProps = {};

export default SmallMultiplesLegend;

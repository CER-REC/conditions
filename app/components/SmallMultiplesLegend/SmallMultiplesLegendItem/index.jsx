import React from 'react';
import PropTypes from 'prop-types';

const SmallMultiplesLegendItem = (props) => {
  return (
    <div>
      <span>[TODO: Change to graph]</span>
      <span>{props.title}</span>
    </div>
  );
};

SmallMultiplesLegendItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    number: PropTypes.number.isRequired,
  }))
};

export default SmallMultiplesLegendItem;

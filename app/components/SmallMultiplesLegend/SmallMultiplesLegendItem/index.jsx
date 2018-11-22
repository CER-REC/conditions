import React from 'react';
import PropTypes from 'prop-types';

const SmallMultiplesLegendItem = (props) => {
  return (
    <div>
      <span>{props.title}</span>
    </div>
  );
};

SmallMultiplesLegendItem.propTypes = {
  title: PropTypes.string
};

export default SmallMultiplesLegendItem;

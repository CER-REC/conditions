import React from 'react';
import PropTypes from 'prop-types';

const Legend = props => (
  <div className="Legend">
    {props.items.map(item => (<div>{item.name}</div>))}
  </div>
);

Legend.propTypes = {
  /** The selected Feature menu item */
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
};

export default Legend;

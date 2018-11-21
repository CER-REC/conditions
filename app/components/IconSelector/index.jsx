import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const IconSelector = props => (
  <div
    className="IconSelector"
    style={{
      background: props.background,
      border: props.border,
      color: props.color,
    }}
  >
    <div className="content">
      {props.children}
    </div>
  </div>
);

IconSelector.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,
};

IconSelector.defaultProps = {
  background: 'none',
  border: 'none',
  color: 'inherit',
};

export default IconSelector;

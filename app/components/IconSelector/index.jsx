import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const IconSelector = props => (
  <div
    className={`IconSelector ${props.className}`}
    style={{
      background: props.background,
      border: props.border,
      color: props.color,
      width: props.size,
      height: props.size,
    }}
    {...(!props.onClick ? {} : handleInteraction(props.onClick))}
  // pass porps onCLick into a function to check and return {...handleInteraction(props.onClick)}
  >
    <div className="IconSelectorContent">
      {props.children}
    </div>
  </div>
);

IconSelector.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string.isRequired,
};

IconSelector.defaultProps = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  className: '',
  onClick: null,
};

export default IconSelector;

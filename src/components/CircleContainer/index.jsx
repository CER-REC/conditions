import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const CircleContainer = props => (
  <div
    className={classNames(
      'CircleContainer',
      props.className,
      { elevated: props.elevated, disabled: props.disabled },
    )}
    style={{
      width: props.size,
      height: props.size,
      color: props.color,
      backgroundColor: props.backgroundColor,
    }}
    {...handleInteraction(props.onClick)}
  >
    <div>
      {props.children}
    </div>
  </div>
);

CircleContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
  elevated: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

CircleContainer.defaultProps = {
  onClick: null,
  disabled: false,
  elevated: false,
  className: '',
  color: '',
  backgroundColor: '',
};

export default CircleContainer;

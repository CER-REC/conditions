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
};

CircleContainer.defaultProps = {
  onClick: null,
  disabled: false,
  elevated: false,
  className: '',
};

export default React.memo(CircleContainer);

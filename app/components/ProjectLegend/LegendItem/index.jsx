import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const LegendItem = props => (
  <div className={classNames(
    'LegendItem',
    { Disabled: props.disabled },
  )}
  >
    <div
      className="Color"
      style={{ backgroundColor: props.color }}
    />
    <div className="Text">{props.text}</div>
  </div>
);

LegendItem.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

LegendItem.defaultProps = {
  disabled: false,
};

export default LegendItem;

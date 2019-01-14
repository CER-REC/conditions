import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';

const LegendItem = ({
  disabled, color, selectedFeature, text,
}) => (
  <div className={classNames(
    'LegendItem',
    { disabled },
  )}
  >
    <div
      className="color"
      style={{ backgroundColor: color }}
    />
    <div className="text">
      <FormattedMessage id={`common.${selectedFeature}Legend.${text}`} />
    </div>
  </div>
);

LegendItem.propTypes = {
  /** The selected feature from the feature menu */
  selectedFeature: PropTypes.string.isRequired,
  /** For legend item transparency */
  disabled: PropTypes.bool,
  /** Demonstrates colour as a box */
  color: PropTypes.string.isRequired,
  /** The descriptor of the colour */
  text: PropTypes.string.isRequired,
};

LegendItem.defaultProps = {
  disabled: false,
};

export default LegendItem;

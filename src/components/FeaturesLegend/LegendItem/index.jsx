import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

// eslint-disable-next-line react/prop-types
const TitledDiv = ({ children }) => <div title={children} className="text">{children}</div>;

const LegendItem = ({ disabled, selectedFeature, text, color }) => (
  <div className={classNames('LegendItem', { disabled })}>
    <div className="color" style={{ backgroundColor: color }} />
    <AdvancedFormattedMessage id={`common.${selectedFeature}.${text}`} tag={TitledDiv} />
  </div>
);

LegendItem.propTypes = {
  /** The selected feature from the feature menu */
  selectedFeature: PropTypes.string.isRequired,
  /** For legend item transparency */
  disabled: PropTypes.bool,
  /** The descriptor of the colour */
  text: PropTypes.string.isRequired,
  /** The color for the square */
  color: PropTypes.string.isRequired,
};

LegendItem.defaultProps = {
  disabled: false,
};

export default React.memo(LegendItem);

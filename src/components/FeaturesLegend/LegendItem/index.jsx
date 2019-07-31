import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';

const LegendItem = ({ disabled, selectedFeature, text, color }) => (
  <div className={classNames('LegendItem', { disabled })}>
    <div className="color" style={{ backgroundColor: color }} />
    <FormattedMessage id={`common.${selectedFeature}.${text}`}>
      {
        formattedText => (
          <div title={formattedText} className="text">
            {formattedText}
          </div>
        )
      }
    </FormattedMessage>
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

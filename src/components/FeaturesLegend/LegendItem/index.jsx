import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';
import { features } from '../../../constants';

const LegendItem = ({
  disabled, selectedFeature, text,
}) => (
  <div className={classNames('LegendItem', { disabled })}>
    <div
      className="color"
      style={{ backgroundColor: features[selectedFeature][text] }}
    />
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
};

LegendItem.defaultProps = {
  disabled: false,
};

export default LegendItem;

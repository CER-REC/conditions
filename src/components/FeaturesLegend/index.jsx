import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LegendItem from './LegendItem';
import FeatureFlag from '../FeatureFlag';

import './styles.scss';

const FeaturesLegend = (props) => {
  if (props.legendItems.length === 0) { return null; }
  const footer = (
    <React.Fragment>
      <div className="featuresLegend">
        <h3 className="Title">
          <FormattedMessage id="components.projectLegend.numberOfConditions" />
        </h3>
        <div className="ChartLegend">
          <div className="legendRow">
            <span className="FlagDesc">0</span>
          </div>
          <div className="legendRow">
            <FeatureFlag
              chartType="legend"
              name="tenConditions"
              count={10}
              color="transparent"
            />
            <span className="FlagDesc">10</span>
          </div>
          <div className="legendRow">
            <FeatureFlag
              chartType="legend"
              name="greaterThanTenConditions"
              count={11}
              color="transparent"
            />
            <span className="FlagDesc"> &gt;10 </span>
          </div>
        </div>
        <div className="AssociatedComp">
          <h3 className="Asterisk">*</h3>
          <div className="AssociatedDesc">
            <FormattedMessage
              id="components.projectLegend.associated"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  const renderedItems = props.legendItems.map(item => (
    <LegendItem
      key={item.description}
      text={item.description}
      disabled={item.disabled}
      selectedFeature={props.selectedFeature}
    />
  ));
  return (
    <div className="FeaturesLegend">
      {renderedItems}
      { props.isProjectLegend ? footer : null }
    </div>
  );
};

FeaturesLegend.propTypes = {
  /** Selected feature from the feature menu */
  selectedFeature: PropTypes.string.isRequired,
  /** Data for the legend item */
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    description: PropTypes.string.isRequired,
  })).isRequired,
  isProjectLegend: PropTypes.bool.isRequired,
};

export default FeaturesLegend;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LegendItem from './LegendItem';
import FeatureFlag from '../FeatureFlag';
import { displayOrder, aggregatedFeatureData } from '../../proptypes';
import getFeatureColor from '../../utilities/getFeatureColor';

import './styles.scss';

const FeaturesLegend = (props) => {
  const { selectedFeature, selectedAggregatedCount } = props;
  if (!selectedAggregatedCount) { return null; }

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

  const aggregatedFeature = selectedAggregatedCount[selectedFeature];
  const renderedItems = props.displayOrder[selectedFeature]
    .map((name, i) => (
      <LegendItem
        key={name}
        text={name}
        disabled={!aggregatedFeature.find(v => v.count > 0 && v.name === name)}
        selectedFeature={selectedFeature}
        color={getFeatureColor(selectedFeature, name, i)}
      />
    ));
  return (
    <div className="FeaturesLegend">
      {renderedItems}
      {props.isProjectLegend ? footer : null}
    </div>
  );
};

FeaturesLegend.propTypes = {
  /** Selected feature from the feature menu */
  selectedFeature: PropTypes.string.isRequired,
  /** Data for the legend item */
  selectedAggregatedCount: aggregatedFeatureData,
  isProjectLegend: PropTypes.bool.isRequired,
  displayOrder: displayOrder.isRequired,
};

FeaturesLegend.defaultProps = {
  selectedAggregatedCount: null,
};

export default FeaturesLegend;

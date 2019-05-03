import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import LegendItem from './LegendItem';
import CircleContainer from '../CircleContainer';
import FeatureFlag from '../FeatureFlag';

import './styles.scss';

const FeaturesLegend = (props) => {
  if (props.legendItems.length === 0) { return null; }

  const header = (
    <div className={classNames('featuresHeader', { hidden: (!props.isProjectLegend) })}>
      <CircleContainer size={24} className="ConditionsIcon">#</CircleContainer>
      <div className="ConditionsDesc">
        <FormattedMessage
          id="components.projectLegend.totalConditions"
        />
      </div>
    </div>
  );

  const footer = (
    <React.Fragment>
      <div className={classNames('featuresLegend', { hidden: (!props.isProjectLegend) })}>
        <h3 className="Title">
          <FormattedMessage id="components.projectLegend.numberOfConditions" />
        </h3>
        <div className="ChartLegend">
          <div className="legendRow">
            <FeatureFlag
              chartType="legend"
              name="zeroConditions"
              count={0}
            />
            <span className="FlagDesc">0</span>
          </div>
          <div className="legendRow">
            <FeatureFlag
              chartType="legend"
              name="tenConditions"
              count={10}
            />
            <span className="FlagDesc">10</span>
          </div>
          <div className="legendRow">
            <FeatureFlag
              chartType="legend"
              name="greaterThanTenConditions"
              count={11}
            />
            <span className="FlagDesc"> &gt;10 </span>
          </div>
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
      {header}
      {renderedItems}
      {footer}
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

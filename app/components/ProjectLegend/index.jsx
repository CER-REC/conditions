import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LegendItem from './LegendItem';
import CircleContainer from '../CircleContainer';
import FeatureFlag from '../FeatureFlag';

import './styles.scss';

const ProjectLegend = (props) => {
  if (props.legendItems.length === 0) { return null; }
  const renderedItems = props.legendItems.map(item => (
    <LegendItem
      key={item.color}
      color={item.color}
      text={item.description}
      disabled={item.disabled}
      selectedFeature={props.selectedFeature}
    />
  ));
  return (
    <div className="ProjectLegend">
      {renderedItems}
      <div className="Footer">
        <h3 className="Title">
          <FormattedMessage id="components.projectLegend.numberOfConditions" />
        </h3>
        <div className="ChartLegend">
          <FeatureFlag
            chartType=""
            name="Zero Conditions"
            count={0}
            color=""
          />
          <div className="FlagDesc">0</div>
          <FeatureFlag
            chartType=""
            name="Ten Conditions"
            count={10}
            color="#fff"
          />
          <div className="FlagDesc">10</div>
          <FeatureFlag
            chartType=""
            name="Greater than ten Conditions"
            count={11}
            color=""
          />
          <div className="FlagDesc"> &gt;10 </div>
        </div>
        <CircleContainer
          size="24px"
          className="ConditionsIcon"
        >
          #
        </CircleContainer>
        <div className="ConditionsDesc">
          <FormattedMessage
            id="components.projectLegend.totalConditions"
          />
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
    </div>
  );
};

ProjectLegend.propTypes = {
  /** Selected feature from the feature menu */
  selectedFeature: PropTypes.string.isRequired,
  /** Data for the legend item */
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProjectLegend;

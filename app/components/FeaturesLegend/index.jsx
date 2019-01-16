import React from 'react';
import PropTypes from 'prop-types';
import LegendItem from './LegendItem';
import CircleContainer from '../CircleContainer';
import FeatureFlag from '../FeatureFlag';

import './styles.scss';

const FeaturesLegend = (props) => {
  if (props.legendItems.length === 0) { return null; }
  const renderedItems = props.legendItems.map(item => (
    <LegendItem
      key={item.color}
      color={item.color}
      text={item.description}
      disabled={item.disabled}
    />
  ));
  return (
    <div className="FeaturesLegend">
      {renderedItems}
      {
        props.isProjectLegend
          ? (
            <div className="Footer">
              <h3 className="Title">Number of Conditions</h3>
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
              <div className="ConditionsDesc">Total Number of Conditions for Project</div>
            </div>
          )
          : null
      }
      <div className="AssociatedComp">
        <div className="AssociatedDesc">* Associated Companies</div>
      </div>
    </div>
  );
};

FeaturesLegend.propTypes = {
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  isProjectLegend: PropTypes.bool.isRequired,
};

export default FeaturesLegend;

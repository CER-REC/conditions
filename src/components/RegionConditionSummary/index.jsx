import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BarContainer from '../BarContainer';
import './styles.scss';
import { features } from '../../constants';

const RegionConditionSummary = (props) => {
  const items = props.featureData.map(k => ({
    value: k.value,
    fill: features[k.feature][k.description] || 'black',
  }));

  return (
    <div className="RegionConditionSummary">
      <div className="ChartContainer">
        <div className="RegionConditionSummaryTitle">
          <FormattedMessage id="components.regionConditionSummary.title" />
        </div>
        <div className={classNames('RegionConditionChart', props.isHidden ? 'hidden' : '')}>
          <BarContainer items={items} vertical />
        </div>
      </div>
      <div className="BorderBottom" />
      <svg className="YAxis" viewBox="0 0 100 100">
        <text x="45" y="18">100</text>
        <rect x="85" y="8" width="10" height="3" />
        <text x="58" y="100">0</text>
        <rect x="85" y="50" width="10" height="3" />
      </svg>
    </div>
  );
};

RegionConditionSummary.propTypes = {
  isHidden: PropTypes.bool,
  featureData: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

RegionConditionSummary.defaultProps = {
  isHidden: false,
};

export default RegionConditionSummary;

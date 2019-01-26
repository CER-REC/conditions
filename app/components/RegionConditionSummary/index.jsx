import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import RegionConditionChart from './RegionConditionChart';
import './styles.scss';

const RegionConditionSummary = props => (
  <div className={classNames(
    'RegionConditionSummary',
    props.className,
  )}
  >
    <div className="ChartContainer">
      <div className="BorderBottom" />
      <div className="RegionConditionSummaryTitle">
        <FormattedMessage id="components.regionConditionSummary.title" />
      </div>
    </div>
    <svg className="YAxis">
      <text x="45" y="21" fill="rgb(161, 168, 167)">100</text>
      <rect x="85" y="15" width="10" height="3" fill="#e4e4e4" />
      <text x="58" y="85" fill="rgb(161, 168, 167)">0</text>
      <rect x="85" y="50" width="10" height="3" fill="#e4e4e4" />
    </svg>
    <div className="Chart">
      <RegionConditionChart featureData={props.featureData} />
    </div>
  </div>
);

RegionConditionSummary.propTypes = {
  className: PropTypes.string,
  featureData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

RegionConditionSummary.defaultProps = {
  className: '',
};

export default RegionConditionSummary;

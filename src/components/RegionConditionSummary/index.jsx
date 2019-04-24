import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import BarContainer from '../BarContainer';
import './styles.scss';
import { features } from '../../constants';

const RegionConditionSummary = (props) => {
  const items = props.featureData.map(k => ({
    value: k.count,
    fill: features[k.feature][k.description] || 'black',
  }));
  return (
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
        <div className="RegionConditionChart">
          <BarContainer items={items} vertical />
        </div>
      </div>
      <svg className="YAxis" viewBox="0 0 100 200">
        <text x="45" y="15">100</text>
        <rect x="85" y="5" width="10" height="3" />
        <text x="58" y="100">0</text>
        <rect x="85" y="50" width="10" height="3" />
      </svg>
    </div>
  );
};

RegionConditionSummary.propTypes = {
  className: PropTypes.string,
  featureData: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
};

RegionConditionSummary.defaultProps = {
  className: '',
};

export default RegionConditionSummary;

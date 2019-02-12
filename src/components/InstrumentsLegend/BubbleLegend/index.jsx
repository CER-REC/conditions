import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

const BubbleLegend = props => (
  <div className={classNames(
    'BubbleLegend',
    props.className,
  )}
  >
    <FormattedMessage id="components.projectLegend.numberOfConditions" />
    <svg viewBox="-200 0 260 300">
      <ellipse className="Ellipse" cx={-(props.radiusOfMaxBubble * 10) / props.maxConditions} cy="3" rx={(props.radiusOfMaxBubble * 10) / props.maxConditions} ry="3" transform="translate(0, 23)" />
      <text className="Text" x="30" y="30">10</text>
      <ellipse className="Ellipse" cx={-(props.radiusOfMaxBubble * 100) / props.maxConditions} cy="10" rx={(props.radiusOfMaxBubble * 100) / props.maxConditions} ry="5" transform="translate(0, 34)" />
      <text className="Text" x="30" y="50">100</text>
      <ellipse className="Ellipse" cx={-(props.radiusOfMaxBubble * 1000) / props.maxConditions} cy="10" rx={(props.radiusOfMaxBubble * 1000) / props.maxConditions} ry="5" transform="translate(0, 54)" />
      <text className="Text" x="30" y="70">1000</text>
      <ellipse className="Ellipse" cx={-(props.radiusOfMaxBubble * props.maxConditions) / props.maxConditions} cy="10" rx={props.radiusOfMaxBubble} ry="5" transform="translate(0, 74)" />
      <text className="Text" x="30" y="90">{props.maxConditions}</text>
    </svg>
  </div>
);

BubbleLegend.propTypes = {
  className: PropTypes.string.isRequired,
  maxConditions: PropTypes.number.isRequired, // number of Conditions in largest Bubble
  radiusOfMaxBubble: PropTypes.number.isRequired,
};

export default BubbleLegend;

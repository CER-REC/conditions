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
      <ellipse cx="3" cy="3" rx="3" ry="3" fill="rgb(228, 228, 228)" transform="translate(0, 23)" />
      <text x="30" y="30" fill="#999">1</text>
      <ellipse cx="40" cy="10" rx="40" ry="5" fill="rgb(228, 228, 228)" transform="translate(-70, 34)" />
      <text x="30" y="50" fill="#999">500</text>
      <ellipse cx="80" cy="10" rx="80" ry="5" fill="rgb(228, 228, 228)" transform="translate(-150, 54)" />
      <text x="30" y="70" fill="#999">1000</text>
      <ellipse cx="100" cy="10" rx={props.hundredWidthBubble} ry="5" fill="rgb(228, 228, 228)" transform="translate(-190, 74)" />
      <text x="30" y="90" fill="#999">{props.maxConditions}</text>
    </svg>
  </div>
);

BubbleLegend.propTypes = {
  className: PropTypes.string.isRequired,
  maxConditions: PropTypes.number, // number of Conditions in largest Bubble
  hundredWidthBubble: PropTypes.number, // diameter of Bubble with 100 Conditions
};

BubbleLegend.defaultProps = {
  maxConditions: 1600,
  hundredWidthBubble: 100,
};

export default BubbleLegend;

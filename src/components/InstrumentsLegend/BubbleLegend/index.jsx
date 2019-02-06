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
      <ellipse cx="100" cy="10" rx="100" ry="5" fill="rgb(228, 228, 228)" transform="translate(-190, 74)" />
      <text x="30" y="90" fill="#999">1600</text>
    </svg>
  </div>
);

BubbleLegend.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BubbleLegend;

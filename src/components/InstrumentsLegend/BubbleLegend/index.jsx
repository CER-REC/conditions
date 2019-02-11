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
      <ellipse className="Ellipse" cx="3" cy="3" rx={props.maxConditions / 300} ry="3" transform="translate(0, 23)" />
      <text className="Text" x="30" y="30">10</text>
      <ellipse className="Ellipse" cx="40" cy="10" rx={props.maxConditions / 40} ry="5" transform="translate(-70, 34)" />
      <text className="Text" x="30" y="50">100</text>
      <ellipse className="Ellipse" cx="80" cy="10" rx={props.maxConditions / 20} ry="5" transform="translate(-150, 54)" />
      <text className="Text" x="30" y="70">1000</text>
      <ellipse className="Ellipse" cx="100" cy="10" rx="100" ry="5" transform="translate(-190, 74)" />
      <text className="Text" x="30" y="90">{props.maxConditions}</text>
    </svg>
  </div>
);

BubbleLegend.propTypes = {
  className: PropTypes.string.isRequired,
  maxConditions: PropTypes.number.isRequired, // number of Conditions in largest Bubble
};

export default BubbleLegend;

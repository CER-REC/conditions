import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

const BubbleLegend = (props) => {
  const values = [10, 100, 1000, props.maxConditions];
  const ellipsis = values.map((k, i) => {
    let ellipsisRadius = (props.radiusOfMaxBubble * k) / props.maxConditions;
    if (ellipsisRadius < 3) { ellipsisRadius = 3; }
    return (
      <g key={k} transform={`translate(0, ${i * 20})`}>
        <ellipse
          className="Ellipse"
          cx={-ellipsisRadius}
          cy="3"
          rx={ellipsisRadius}
          ry={3 + i}
          transform="translate(0, 23)"
        />
        <text className="Text" x="30" y={30}>{k}</text>
      </g>
    );
  });

  return (
    <div className={classNames(
      'BubbleLegend',
      props.className,
    )}
    >
      <FormattedMessage id="components.projectLegend.numberOfConditions" />
      <svg viewBox="-200 0 260 300">
        {ellipsis}
      </svg>
    </div>
  );
};

BubbleLegend.propTypes = {
  className: PropTypes.string.isRequired,
  /* number of Conditions in largest Bubble */
  maxConditions: PropTypes.number.isRequired,
  radiusOfMaxBubble: PropTypes.number.isRequired,
};

export default BubbleLegend;

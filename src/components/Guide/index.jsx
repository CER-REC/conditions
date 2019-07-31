import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import CircleContainer from '../CircleContainer';

import './styles.scss';

import { guideSize } from '../../constants';

// Just so there's something to map over in the JSX
const textPlaceholders = new Array(8).fill(null);

const wedgesStart = 2;
const wedgesEnd = 7;
const numWedges = wedgesEnd - wedgesStart + 1;

const wedgeWidth = 10;
const padding = 4;

const radius = guideSize / 2 + wedgeWidth + padding;

const x1 = 0;
const y1 = -radius + padding;

const r2 = radius - padding;
const x2 = 0.866 * r2;
const y2 = -(0.5 * r2);

const r3 = radius - padding - wedgeWidth;
const x3 = 0.866 * r3;
const y3 = -(0.5 * r3);

const x4 = 0;
const y4 = -radius + padding + wedgeWidth;

const Guide = ({ step, onClick, loading, className }) => {
  const wedges = [];
  for (let i = 0; i < numWedges; i += 1) {
    const hidden = i > (step - wedgesStart);
    wedges.push((
      <g
        key={`wedge-${i}`}
        className="wedge"
        style={{ transform: (hidden ? 'scale(0.8, 0.8)' : 'scale(1, 1)') }}
      >
        <path
          transform={`
            rotate(${i * 360 / numWedges})
            translate(1, -2)
          `}
          d={`
            M ${x1} ${y1}
            A ${r2} ${r2} 0 0 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${r3} ${r3} 0 0 0 ${x4} ${y4}
            Z
          `}
        />
      </g>
    ));
  }

  return (
    <div
      className={classNames('Guide', className)}
      style={{ width: 2 * radius, height: 2 * radius }}
    >
      {wedges.length === 0 ? null : (
        <svg
          className="wedgeContainer"
          viewBox={`${-radius} ${-radius} ${2 * radius} ${2 * radius}`}
        >
          {wedges}
        </svg>
      )}
      <CircleContainer size={guideSize} onClick={onClick}>
        <AdvancedFormattedMessage
          id="components.guide.loading"
          className={(loading) ? '' : 'hidden'}
        />
        {textPlaceholders.map((_, idx) => (
          <AdvancedFormattedMessage
            id={`components.guide.tutorial.${idx}`}
            key={idx /* eslint-disable-line react/no-array-index-key */}
            className={(!loading && idx === step) ? '' : 'hidden'}
          />
        ))}
      </CircleContainer>
    </div>
  );
};

Guide.propTypes = {
  step: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

Guide.defaultProps = {
  loading: false,
  className: '',
};

export default React.memo(Guide);

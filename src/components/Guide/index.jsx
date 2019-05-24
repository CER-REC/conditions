import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../CircleContainer';

import './styles.scss';

const guideSize = 128;

// Just so there's something to map over in the JSX
const textPlaceholders = new Array(7).fill(null);

const wedgesStart = 1;
const wedgesEnd = 6;
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

const Guide = ({ step, onClick }) => {
  const wedges = [];
  if (step >= wedgesStart && step <= wedgesEnd) {
    for (let i = 0; i <= (step - wedgesStart); i += 1) {
      wedges.push((
        <path
          className="wedge"
          key={`wedge-${i}`}
          transform={`rotate(${i * 360 / numWedges}) translate(1, -2)`}
          d={`
            M ${x1} ${y1}
            A ${r2} ${r2} 0 0 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${r3} ${r3} 0 0 0 ${x4} ${y4}
            Z
          `}
        />
      ));
    }
  }

  return (
    <div className="Guide" style={{ width: 2 * radius, height: 2 * radius }}>
      <CircleContainer size={guideSize} onClick={onClick}>
        {
          textPlaceholders.map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <FormattedMessage id={`components.guide.tutorial.${idx}`} key={idx}>
              {text => <span className={(idx === step) ? '' : 'hidden'}>{text}</span>}
            </FormattedMessage>
          ))
        }
      </CircleContainer>
      {(wedges.length)
        ? (
          <svg
            className="wedgeContainer"
            viewBox={`${-radius} ${-radius} ${2 * radius} ${2 * radius}`}
          >
            {wedges}
          </svg>
        ) : null

      }
    </div>
  );
};

Guide.propTypes = {
  step: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Guide;

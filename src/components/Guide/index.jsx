import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../CircleContainer';

import './styles.scss';

const guideSize = 176;

// Just so there's something to map over in the JSX
const textPlaceholders = new Array(8).fill(null);

const wedgesStart = 2;
const wedgesEnd = 7;
const numWedges = wedgesEnd - wedgesStart + 1;

const wedgeWidth = 10;

const padding = 4;

const overallSize = guideSize + 2 * wedgeWidth + 2 * padding;
const halfOverallSize = overallSize / 2;

const Guide = ({ step, onClick }) => {
  const wedges = [];
  if (step >= wedgesStart && step <= wedgesEnd) {
    for (let i = 0; i <= (step - wedgesStart); i += 1) {
      wedges.push((
        <path
          className="wedge"
          transform={`rotate(${i * 360 / numWedges}) translate(1, -2)`}
          d={`
            M 0 ${-halfOverallSize + padding}
            A ${halfOverallSize - padding} ${halfOverallSize - padding} 0 0 1 ${0.866 * (halfOverallSize - padding)} -${0.5 * (halfOverallSize - padding)}
            L ${0.866 * (halfOverallSize - padding - wedgeWidth)} -${0.5 * (halfOverallSize - padding - wedgeWidth)}
            A ${halfOverallSize - padding - wedgeWidth} ${halfOverallSize - padding - wedgeWidth} 0 0 0 0 ${-halfOverallSize + padding + wedgeWidth}
            Z
          `}
        />
      ));
    }
  }

  return (
    <div className="Guide" style={{ width: overallSize, height: overallSize }}>
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
            viewBox={`-${overallSize / 2} -${overallSize / 2} ${overallSize} ${overallSize}`}
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

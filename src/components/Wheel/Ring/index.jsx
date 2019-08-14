import React from 'react';
import './styles.scss';
import { browseByType } from '../../../proptypes';

const Ring = ({ ringType }) => {
  const linebackground = `LineBackground ${ringType}`;
  const ringbackground = `RingBackground ${ringType}`;
  const lineRenderer = () => {
    const lineArray = [];
    for (let i = 0; i < 360; i += 10) {
      lineArray.push(<line
        key={`${i}ring`}
        y1="28%"
        y2="23.5%"
        transform={`rotate(${i})`}
      />);
    }
    return lineArray;
  };

  return (
    <g className="Ring">
      <defs>
        <mask id="clip-path-WheelRing">
          <circle cx="50%" cy="50%" r="28%" fill="white" />
          <circle cx="50%" cy="50%" r="23.5%" />
        </mask>
      </defs>
      <circle cx="50%" cy="50%" r="28%" mask="url(#clip-path-WheelRing)" className={ringbackground} />
      <svg viewBox="50 50 100 100">
        <g className={`Lines ${linebackground}`} transform="translate(100 100)">
          { lineRenderer()}
        </g>
      </svg>
      <g className="OuterRing RingOutline">
        <circle cx="50%" cy="50%" r="28%" />
      </g>
      <g className="InnerRing RingOutline ">
        <circle cx="50%" cy="50%" r="23.5%" />
      </g>
    </g>

  );
};

Ring.propTypes = {
  ringType: browseByType.isRequired,
};

export default React.memo(Ring);

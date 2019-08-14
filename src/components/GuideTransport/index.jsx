import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import handleInteraction from '../../utilities/handleInteraction';
import './styles.scss';

const chevronValues = {
  angleDx: 18,
  angleDy: 23,
  horzDx: 18,
  x1: 15,
  x2: 44,
  y: 50,
};

const chevronPath = `
  l ${chevronValues.angleDx} -${chevronValues.angleDy}
  l ${chevronValues.horzDx} 0
  l -${chevronValues.angleDx} ${chevronValues.angleDy}
  l ${chevronValues.angleDx} ${chevronValues.angleDy}
  l -${chevronValues.horzDx} 0
  Z
`;

const playPath = `
  M 38 27
  L 72 50
  L 38 73
  Z
`;

const pausePath = `
  M 30 27
  L 44 27
  L 44 73
  L 30 73
  Z
  M 70 27
  L 56 27
  L 56 73
  L 70 73
  Z
`;

const GuideTransport = ({ playing, back, forward, togglePlay }) => (
  <div className="GuideTransport">
    <FormattedMessage id="components.guideTransport.caption" />
    <svg
      className="back"
      viewBox="0 0 100 100"
      {...handleInteraction(back)}
    >
      <circle cx="50" cy="50" r="48" />
      <path d={`M ${chevronValues.x1} ${chevronValues.y} ${chevronPath}`} />
      <path d={`M ${chevronValues.x2} ${chevronValues.y} ${chevronPath}`} />
    </svg>
    <svg
      className="togglePlay"
      viewBox="0 0 100 100"
      {...handleInteraction(togglePlay)}
    >
      <circle cx="50" cy="50" r="48" className={(!playing ? 'pink' : '')} />
      <path d={playing ? pausePath : playPath} />
    </svg>
    <svg
      className="forward"
      viewBox="0 0 100 100"
      style={{ transform: 'scaleX(-1' }}
      {...handleInteraction(forward)}
    >
      <circle cx="50" cy="50" r="48" />
      <path d={`M ${chevronValues.x1} ${chevronValues.y} ${chevronPath}`} />
      <path d={`M ${chevronValues.x2} ${chevronValues.y} ${chevronPath}`} />
    </svg>
  </div>
);

GuideTransport.propTypes = {
  playing: PropTypes.bool,
  back: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

GuideTransport.defaultProps = {
  playing: false,
};

export default React.memo(GuideTransport);

import React from 'react';
import PropTypes from 'prop-types';

import handleInteraction from '../../utilities/handleInteraction';
import './styles.scss';

const GuideTransport = ({ playing, back, forward, togglePlay }) => (
  <div className="GuideTransport">
    <button type="button" {...handleInteraction(back)}>
      Back
    </button>
    <button type="button" {...handleInteraction(togglePlay)}>
      {playing
        ? 'Pause'
        : 'Play'
      }
    </button>
    <button type="button" {...handleInteraction(forward)}>
      Forward
    </button>
  </div>
);

GuideTransport.propTypes = {
  playing: PropTypes.bool.isRequired,
  back: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default GuideTransport;

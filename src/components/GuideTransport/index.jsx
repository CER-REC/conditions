import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const GuideTransport = ({ playing, back, forward, togglePlay }) => (
  <div className="GuideTransport">
    <button type="button">Back</button>
    <button type="button">Play/Pause</button>
    <button type="button">Forward</button>
  </div>
);

GuideTransport.propTypes = {
  playing: PropTypes.bool.isRequired,
  back: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default GuideTransport;

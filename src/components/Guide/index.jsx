import React from 'react';
import PropTypes from 'prop-types';
import CircleContainer from '../CircleContainer';

import './styles.scss';

const Guide = () => {
  return (
    <CircleContainer
      className="Guide"
      size={128}
    >
      <span>Scroll Down</span>
    </CircleContainer>
  );
};

export default Guide;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CircleContainer from '../CircleContainer';

import './styles.scss';

const Guide = ({ textState }) => (
  <CircleContainer className="Guide" size={128}>
    <FormattedMessage id={`components.guide.tutorial.${textState}`} />
  </CircleContainer>
);

Guide.propTypes = {
  textState: PropTypes.number.isRequired,
};

export default Guide;

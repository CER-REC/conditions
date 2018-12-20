import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FeatureDescription = props => (
  <div
    className="feature-description"
    role="document"
    aria-label={`${props.feature} description`}
  >
    <h1>{props.feature}</h1>
    {props.description}
  </div>
);

FeatureDescription.propTypes = {
  description: PropTypes.string.isRequired,
  feature: PropTypes.string.isRequired,
};

export default FeatureDescription;

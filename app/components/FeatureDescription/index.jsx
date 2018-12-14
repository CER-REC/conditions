import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FeatureDescription = (props) => {
  if (props.description === '' || props.feature === '') { return null; }
  return (
    <div
      className="feature-description"
      role="document"
      aria-label={`${props.feature} description`}
    >
      <h1>{props.feature}</h1>
      {props.description}
    </div>
  );
};

FeatureDescription.propTypes = {
  description: PropTypes.string,
  feature: PropTypes.string,
};

FeatureDescription.defaultProps = {
  description: '',
  feature: '',
};

export default FeatureDescription;

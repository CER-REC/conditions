import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FeatureDescription = (props) => {
  if (props.description === '') { return null; }
  return (
    <div className="feature-description" />
  );
};

FeatureDescription.propTypes = {
  description: PropTypes.string,
};

FeatureDescription.defaultProps = {
  description: '',
};

export default FeatureDescription;

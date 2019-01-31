import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

const instrumentGroupColors = {
  routing: '#0E2B8C',
  construction: '#27A5F9',
  abandonment: '#164EF8',
  misc: '#D4A92A',
  safety: '#C904C2',
  tariffs: '#C3E6B3',
  opening: '#6AE6B2',
};

const instrumentCodeGroups = {
  opl: 'routing',
  gpl: 'routing',
  gc: 'construction',
  oc: 'construction',
};

const featureTypes = {
  theme: [
    'security',
    'managementSystem',
    'financial',
  ],
  instrument: [
    'routing',
    'construction',
  ],
};

const FeatureTypeDescription = (props) => {
  return (
    <div className="feature-type-description">
      {featureTypes[props.feature].map((type) => {
        return (
          <React.Fragment>
            <FormattedMessage id={`common.${props.feature}.${type}`} tagName="h2" />
            <FormattedMessage id={`components.featureTypeDescription.${props.feature}.${type}`} tagName="p" />
          </React.Fragment>
        )
      })}
    </div>
  );
};

FeatureTypeDescription.propTypes = {
  feature: PropTypes.string,
};

FeatureTypeDescription.defaultProps = {
  feature: 'theme',
};

export default FeatureTypeDescription;

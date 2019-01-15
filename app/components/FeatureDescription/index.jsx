import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

const FeatureDescription = props => (
  <div
    className="feature-description"
    role="document"
    aria-label={`${props.feature} description`}
  >
    <h1>
      <FormattedMessage id={`common.features.${props.feature}`}>
        {text => text}
      </FormattedMessage>
    </h1>
    <FormattedMessage id={props.description}>
      { (text) => {
        const stringArr = text.split('\n');
        // eslint-disable-next-line react/no-array-index-key
        return stringArr.map((string, index) => <p key={index}>{string}</p>);
      }}
    </FormattedMessage>
  </div>
);

FeatureDescription.propTypes = {
  /** Path to description in translation file ex.(components.projectsOverview.description) */
  description: PropTypes.string.isRequired,
  /** The selected feature in the feature menu */
  feature: PropTypes.string.isRequired,
};

export default FeatureDescription;

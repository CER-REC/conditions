import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { featureTypes } from '../../proptypes';

const FeatureDescription = props => (
  <div
    className="feature-description"
    role="document"
    aria-label={`${props.feature} description`}
  >
    <FormattedMessage id={`common.features.${props.feature}`} tagName="h1" />
    <FormattedMessage
      id={`components.featureDescription.${props.feature}`}
      values={{
        link: (url, title) => <a href={url} target="_blank">{title}</a>,
      }}
    >
      {/* eslint-disable-next-line react/no-array-index-key */}
      {text => text.split('\n').map((str, i) => <p key={i}>{str}</p>)}
    </FormattedMessage>
  </div>
);

FeatureDescription.propTypes = {
  /** The selected feature in the feature menu */
  feature: featureTypes.isRequired,
};

export default FeatureDescription;

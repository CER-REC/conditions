import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { featureTypes } from '../../proptypes';
import { featureDescriptionLinks } from '../../constants';

const formatLink = id => (
  <a href={featureDescriptionLinks[id]} rel="noopener noreferrer" target="_blank">
    <FormattedMessage id={`components.featureDescription.links.${id}`} />
  </a>
);

const linkValues = {
  phaseLink: formatLink('phase'),
  instrumentLink: formatLink('instrument'),
};

const FeatureDescription = props => (
  <div
    className="feature-description"
    role="document"
    aria-label={`${props.feature} description`}
  >
    <FormattedMessage id={`common.features.${props.feature}`} tagName="h1" />
    <FormattedMessage
      id={`components.featureDescription.${props.feature}`}
      tagName="p"
      values={linkValues}
    />
  </div>
);

FeatureDescription.propTypes = {
  /** The selected feature in the feature menu */
  feature: featureTypes.isRequired,
};

export default React.memo(FeatureDescription);

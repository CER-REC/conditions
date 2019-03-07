import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { featureTypes } from '../../proptypes';

const getLink = (link, text) => (
  <a href={link} rel="noopener noreferrer" target="_blank">
    <FormattedMessage id={text} />
  </a>
);

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
        regDocsLink: getLink('https://apps.neb-one.gc.ca/REGDOCS/', 'common.linkText.regDocs'),
        phaseLink: getLink('https://www.neb-one.gc.ca/sftnvrnmnt/nvrnmnt/lfcclpprch/index-eng.html#s1', 'common.linkText.here'),
      }}
    />
  </div>
);

FeatureDescription.propTypes = {
  /** The selected feature in the feature menu */
  feature: featureTypes.isRequired,
};

export default FeatureDescription;

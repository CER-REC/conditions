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
        regDocsLink: <a href="https://apps.neb-one.gc.ca/REGDOCS/" rel="noopener noreferrer" target="_blank"><FormattedMessage id="common.linkText.regDocs" /></a>,
        phaseLink: <a href="https://www.neb-one.gc.ca/sftnvrnmnt/nvrnmnt/lfcclpprch/index-eng.html#s1" rel="noopener noreferrer" target="_blank"><FormattedMessage id="common.linkText.here" /></a>,
      }}
    />
  </div>
);

FeatureDescription.propTypes = {
  /** The selected feature in the feature menu */
  feature: featureTypes.isRequired,
};

export default FeatureDescription;

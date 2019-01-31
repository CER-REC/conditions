import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import './styles.scss';

const instrumentCodeGroups = {
  OPL: 'routing',
  GPL: 'routing',
  GC: 'construction',
  OC: 'construction',
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

// Returns the localized heading and description text for a given feature type
// in the form [heading, description]
const getFormattedTypeContent = (intl, feature, type) => {
  const headingId = (feature === 'instrument')
    ? `common.instrument.category.${type}`
    : `common.${feature}.${type}`;

  const heading = intl.formatMessage({ id: headingId });

  const description = intl.formatMessage({
    id: `components.featureTypesDescription.${feature}.${type}`,
  });

  return [heading, description];
};

// Adds color coding to Instrument codes at the beginning of a line
const instrumentDescription = (item) => {
  const [, code, text] = item.match(/^([A-Z]+)(: .+)/);

  return (code)
    ? [
      <span key="type-code" className={`color-${instrumentCodeGroups[code]}`}>{code}</span>,
      <span key="type-text">{text}</span>,
    ]
    : item;
};

// Returns a heading element and one or more paragraphs of localized text for a
// given feature type, in the form [heading, description]
const getTypeElements = (intl, feature, type) => {
  const [heading, description] = getFormattedTypeContent(
    intl,
    feature,
    type,
  );

  const typeDescription = description.split('\n')
    .map((item, idx) => {
      const text = (feature === 'instrument')
        ? instrumentDescription(item)
        : item;

      // eslint-disable-next-line react/no-array-index-key
      return <p key={`${type}-text-${idx}`}>{text}</p>;
    });

  return [
    <h4 key={`type-heading-${type}`} id={`feature-type-${feature}-${type}`}>{heading}</h4>,
    <React.Fragment key={`type-description-${type}`}>{typeDescription}</React.Fragment>,
  ];
};

const FeatureTypesDescription = (props) => {
  const content = featureTypes[props.feature].reduce((acc, type) => {
    const elements = getTypeElements(props.intl, props.feature, type);

    return acc.concat(elements);
  }, []);

  return (
    <div className="feature-types-description">
      {content}
    </div>
  );
};

FeatureTypesDescription.propTypes = {
  feature: PropTypes.string,
  intl: intlShape.isRequired,
};

FeatureTypesDescription.defaultProps = {
  feature: 'theme',
};

export default injectIntl(FeatureTypesDescription);

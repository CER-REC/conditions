import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

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

const getInstrumentColorCode = (code) => {
  const group = instrumentCodeGroups[code];
  return instrumentGroupColors[group];
};

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

const instrumentCodeElement = code => (
  <span key="type-code" style={{ color: getInstrumentColorCode(code) }}>{code}</span>
);

const instrumentDescription = (item) => {
  const [, code, text] = item.match(/^([A-Z]+)(: .+)/);

  return (code)
    ? [
      instrumentCodeElement(code),
      <span key="type-text">{text}</span>,
    ]
    : item;
};

const FeatureTypesDescription = (props) => {
  const content = featureTypes[props.feature].reduce((acc, type) => {
    const [heading, description] = getFormattedTypeContent(
      props.intl,
      props.feature,
      type,
    );

    const typeDescription = description.split('\n')
      .map((item, idx) => {
        const text = (props.feature === 'instrument')
          ? instrumentDescription(item)
          : item;

        // This list is static and the elements will never be re-rendered
        // individually, so using the index for a key isn't an issue.

        // eslint-disable-next-line react/no-array-index-key
        return <p key={`${type}-text-${idx}`}>{text}</p>;
      });

    acc.push(
      <h4 key={`type-heading-${type}`} id={`feature-type-${props.feature}-${type}`}>{heading}</h4>,
      <React.Fragment key={`type-description-${type}`}>{typeDescription}</React.Fragment>,
    );

    return acc;
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

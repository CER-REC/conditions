import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

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

/*
import { injectIntl, intlShape } from 'react-intl';

const Component = (props) => {
  const { intl } = props;
  // If translation is needed outside of JSX
  const translation = intl.formatMessage({ id: 'component.translation' });
  ...
  return <span>{translation}</span>;
};
Component.propTypes = {

  intl: intlShape.isRequired,
};
*/

const FeatureTypeDescription = (props) => {

  const content = featureTypes[props.feature].reduce((acc, type) => {

    const headingId = (props.feature === 'instrument')
      ? `common.instrument.category.${type}`
      : `common.${props.feature}.${type}`;

    const typeDescription = props.intl
      .formatMessage({ id: `components.featureTypeDescription.${props.feature}.${type}`})
      .split('\n')
      .map((item) => {

        let out;
        if (props.feature === 'instrument') {
          const code = item.match(/^([A-Z]+)(: .+)/);

          if (code) {
            // typeDescription[i] = item.replace(code, <ColoredInstrumentCode code={code} />)
            const coloredCode = <span style={{color: `${instrumentGroupColors[ instrumentCodeGroups[ code[1].toLowerCase() ] ]}`}}>{code[1]}</span>
            out = [coloredCode, <span>{code[2]}</span>];
          }
        }

        return <p>{out || item}</p>
      });

    acc.push(
      <FormattedMessage id={headingId} tagName="h4" />,
      <p>{typeDescription}</p>,
    );

    return acc;

  }, []);

  return (
    <div className="feature-type-description">
      {content}
    </div>
  );
};

FeatureTypeDescription.propTypes = {
  feature: PropTypes.string,
  intl: intlShape.isRequired,
};

FeatureTypeDescription.defaultProps = {
  feature: 'theme',
};

// export default FeatureTypeDescription;
export default injectIntl(FeatureTypeDescription);

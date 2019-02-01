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

class FeatureTypesDescription extends React.PureComponent {
  constructor() {
    super();
    this.ref = React.createRef();
    this.headingRefs = {};
  }

  // Returns the localized heading and description text for a given feature type
  // in the form [heading, description]
  getFormattedTypeContent = (intl, feature, type) => {
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
  instrumentDescription = (item) => {
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
  getTypeElements = (intl, feature, type) => {
    const [heading, description] = this.getFormattedTypeContent(
      intl,
      feature,
      type,
    );

    const typeDescription = description.split('\n')
      .map((item, idx) => {
        const text = (feature === 'instrument')
          ? this.instrumentDescription(item)
          : item;

        // eslint-disable-next-line react/no-array-index-key
        return <p key={`${type}-text-${idx}`}>{text}</p>;
      });

    this.headingRefs[type] = React.createRef();

    return [
      <h4
        key={`type-heading-${type}`}
        ref={this.headingRefs[type]}
      >
        {heading}
      </h4>,
      <React.Fragment key={`type-description-${type}`}>{typeDescription}</React.Fragment>,
    ];
  };

  scrollTo = (feature) => {
    const newTop = this.headingRefs[feature].current.offsetTop - this.ref.current.offsetTop;
    this.ref.current.scrollTop = newTop;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.scrollTarget !== this.props.scrollTarget) {
      this.scrollTo(this.props.scrollTarget);
    }
  };

  render() {
    const content = featureTypes[this.props.feature].reduce((acc, type) => {
      const elements = this.getTypeElements(this.props.intl, this.props.feature, type);

      return acc.concat(elements);
    }, []);

    return (
      <div
        className="feature-types-description"
        ref={this.ref}
      >
        {content}
      </div>
    );
  }
}

FeatureTypesDescription.propTypes = {
  feature: PropTypes.string,
  scrollTarget: PropTypes.string,
  intl: intlShape.isRequired,
};

FeatureTypesDescription.defaultProps = {
  feature: 'theme',
  scrollTarget: '',
};

export default injectIntl(FeatureTypesDescription);

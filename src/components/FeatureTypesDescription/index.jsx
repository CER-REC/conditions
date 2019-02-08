import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

class FeatureTypesDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  // Adds color coding to Instrument codes at the beginning of a line
  addColorCoding = (item, colorCodes) => {
    const [, code, text] = item.match(/^([A-Z]+)(: .+)/);

    return (code)
      ? (
        <React.Fragment>
          <span className={`color-${colorCodes[code]}`}>{code}</span>
          <span>{text}</span>
        </React.Fragment>
      ) : item;
  };

  // Returns a heading element and one or more paragraphs of localized text for a
  // given feature type, in the form [heading, description]
  renderTypeElements = (feature, type, colorCodes) => {
    const headingId = `common.${feature}.${type}`;
    // const heading = intl.formatMessage({ id: headingId });
    const heading = <FormattedMessage id={headingId} tagName="h4" />;

    // const typeDescription = intl.formatMessage({
    //   id: `components.featureTypesDescription.${feature}.${type}`,
    // })
    //   .split('\n')
    //   .map((item) => {
    //     const text = (colorCodes)
    //       ? this.addColorCoding(item, colorCodes)
    //       : item;

    //     // eslint-disable-next-line react/no-array-index-key
    //     return <p>{text}</p>;
    //   });

    const typeDescription = (
      <FormattedMessage id={`components.featureTypesDescription.${feature}.${type}`}>
        {str => str.split('\n').map(line => (
          <p>{(colorCodes) ? this.addColorCoding(line, colorCodes) : line}</p>
        ))}

      </FormattedMessage>
    );

    return (
      <React.Fragment key={type}>
        <h4 data-heading={type}>{heading}</h4>
        {typeDescription}
      </React.Fragment>
    );
  };

  scrollTo = (type) => {
    const elm = this.ref.current.querySelector(`[data-heading="${type}"]`);
    this.ref.current.scrollTop = elm.offsetTop - this.ref.current.offsetTop;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.scrollTarget !== this.props.scrollTarget) {
      this.scrollTo(this.props.scrollTarget);
    }
  };

  render() {
    const content = this.props.types.map((type) => {
      const elements = this.renderTypeElements(
        this.props.feature,
        type,
        this.props.colorCodes,
      );

      return elements;
    });

    return (
      <div
        className="FeatureTypesDescription"
        ref={this.ref}
      >
        {content}
      </div>
    );
  }
}

FeatureTypesDescription.propTypes = {
  /** Keyword or path where types can be found (ex. "theme", "instrument.category" */
  feature: PropTypes.string.isRequired,
  /** Keywords in the translation file for each type
   * (ex. ["security", "managementSystem", "financial"]) */
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Hash of instrument color codes (ex. {OPL: "routing"}  */
  colorCodes: PropTypes.objectOf(PropTypes.string),
  /** Heading that the container should scroll to (ex. "security") */
  scrollTarget: PropTypes.string,
};

FeatureTypesDescription.defaultProps = {
  scrollTarget: '',
  colorCodes: null,
};

export default FeatureTypesDescription;

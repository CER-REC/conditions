import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

class FeatureTypesDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  scrollTo = (type) => {
    const elm = this.ref.current.querySelector(`[data-heading="${type}"]`);
    this.ref.current.scrollTop = (elm)
      ? (elm.offsetTop - this.ref.current.offsetTop)
      : 0;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.subFeature !== this.props.subFeature) {
      this.scrollTo(this.props.subFeature);
    }
  };

  render() {
    const { feature, subFeature, displayOrder } = this.props;

    let headerId;
    if (feature === 'theme' && subFeature === '') {
      headerId = 'allThemes';
    } else if (feature === 'instrument') {
      headerId = 'otherInstruments';
    }

    const header = (headerId)
      ? (
        <FormattedMessage id={`components.featureTypesDescription.${headerId}`}>
          {text => <p>* {text}</p> }
        </FormattedMessage>
      ) : null;

    const content = displayOrder.map(type => (
      <React.Fragment key={type}>
        {(feature === 'instrument')
          ? <h4 data-heading={type}>{type}</h4>
          : (
            <FormattedMessage id={`common.${feature}.${type}`}>
              {text => <h4 data-heading={type}>{text}</h4>}
            </FormattedMessage>
          )
        }
        <FormattedMessage
          id={`components.featureTypesDescription.${feature}.${type}`}
        >
          {
            str => str.split('\n').map((line, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={idx}>
                {line}
              </p>
            ))
          }
        </FormattedMessage>
      </React.Fragment>
    ));

    if (feature === 'instrument') {
      content.splice(9, 0, (
        <FormattedMessage
          key="other"
          tagName="h3"
          id="components.featureTypesDescription.instrument.OTHER"
        />
      ));
    }

    return (
      <div
        className="FeatureTypesDescription"
        ref={this.ref}
      >
        {header}
        {content}
      </div>
    );
  }
}

FeatureTypesDescription.propTypes = {
  /** Keyword or path where types can be found (ex. "theme", "instrument.category" */
  feature: PropTypes.string.isRequired,
  /** Heading that the container should scroll to (ex. "security") */
  subFeature: PropTypes.string,
  /** Display order by feature type */
  displayOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FeatureTypesDescription.defaultProps = {
  subFeature: '',
};

export default FeatureTypesDescription;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { features } from '../../constants';
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
    const { feature } = this.props;
    const content = Object.entries(features[feature]).map(([type, color]) => (
      <React.Fragment key={type}>
        <FormattedMessage id={`common.${feature}.${type}`}>
          {text => <h4 data-heading={type}>{text}</h4>}
        </FormattedMessage>
        <FormattedMessage
          id={`components.featureTypesDescription.${feature}.${type}`}
        >
          {str => str.split('\n').map((line, idx) => {
            let prefix = null;
            const split = line.split(':');
            if (split.length > 1) {
              prefix = <span style={{ color }}>{split.splice(0, 1)}:</span>;
            }
            return (
              // eslint-disable-next-line react/no-array-index-key
              <p key={idx}>
                {prefix}
                <span>{split.join(':')}</span>
              </p>
            );
          })}
        </FormattedMessage>
      </React.Fragment>
    ));

    return (
      <div
        className="FeatureTypesDescription"
        ref={this.ref}
      >
        {(this.props.feature === 'theme' && this.props.subFeature === '')
          ? (
            <FormattedMessage id="components.featureTypesDescription.allThemes">
              {text => <p>* {text}</p> }
            </FormattedMessage>
          )
          : null
        }
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
};

FeatureTypesDescription.defaultProps = {
  subFeature: '',
};

export default FeatureTypesDescription;

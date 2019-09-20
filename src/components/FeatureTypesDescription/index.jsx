import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import TranslatedParagraphs from '../TranslatedParagraphs';
import { displayOrder as displayOrderPropType } from '../../proptypes';
import './styles.scss';

// eslint-disable-next-line react/prop-types
const FeatureTypeHeading = ({ feature, type }) => ((feature === 'instrument' && type !== 'OTHER')
  ? (
    <>
      <h4 date-heading={type}>
        {type} - <FormattedMessage id={`common.${feature}.${type}`} />
      </h4>
    </>
  )
  : <AdvancedFormattedMessage id={`common.${feature}.${type}`} tag="h4" data-heading={type} />
);

class FeatureTypesDescription extends React.PureComponent {
  static propTypes = {
    /** Keyword or path where types can be found (ex. "theme", "instrument.category" */
    feature: PropTypes.string.isRequired,
    /** Heading that the container should scroll to (ex. "security") */
    subFeature: PropTypes.string,
    /** Display order by feature type */
    displayOrder: displayOrderPropType.isRequired,
  };

  static defaultProps = {
    subFeature: '',
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.props.subFeature) { this.scrollTo(this.props.subFeature); }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subFeature !== this.props.subFeature) {
      this.scrollTo(this.props.subFeature);
    }
  }

  scrollTo = (type) => {
    if (!this.ref.current) { return; }
    const elm = this.ref.current.querySelector(`[data-heading="${type}"]`);
    this.ref.current.scrollTop = (elm)
      ? (elm.offsetTop - this.ref.current.offsetTop)
      : 0;
  }

  renderEntry = (feature, type, className) => {
    const content = (feature === 'instrument' && type === 'OTHER') ? null : (
      <AdvancedFormattedMessage
        id={`components.featureTypesDescription.${feature}.${type}`}
        tag={TranslatedParagraphs}
      />
    );
    return (
      <div key={type} className={className}>
        <FeatureTypeHeading feature={feature} type={type} />
        {content}
      </div>
    );
  }

  render() {
    const { feature, subFeature, displayOrder } = this.props;

    let headerId;
    if (feature === 'theme' && subFeature === '') {
      headerId = 'allThemes';
    } else if (feature === 'instrument') {
      headerId = 'otherInstruments';
    }

    const header = !headerId ? null : (
      <AdvancedFormattedMessage
        id={`components.featureTypesDescription.${headerId}`}
        tag="p"
        className="info"
      />
    );

    let content = displayOrder[feature].map(type => this.renderEntry(feature, type));

    if (feature === 'instrument') {
      content = content.concat(
        displayOrder.instrumentOther.map(type => this.renderEntry(feature, type, 'other')),
      );
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

export default FeatureTypesDescription;

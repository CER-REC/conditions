import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

import ContentBlock from '../ContentBlock';

class Content extends React.PureComponent {
  renderContentText = (id, content) => {
    const paragraphs = content.split('\n');
    const heading = (
      <FormattedMessage id={id}>
        {text => <span className="contentHeading">{text}</span>}
      </FormattedMessage>
    );

    return React.createElement(React.Fragment, {},
      <p className="contentText">{heading}: {paragraphs[0]}</p>,
      ...paragraphs.slice(1).map(text => <p className="contentText">{text}</p>));
  }

  renderInstrumentLink = instrumentNumber => (
    <button
      type="button"
      className="instrumentLink"
      {...handleInteraction(this.props.openIntermediatePopup, instrumentNumber)}
    >
      {instrumentNumber}
    </button>
  )

  render() {
    const data = this.props.instrument;

    return (
      <div className="Content">{
        (this.props.itemIndex === -1)
          ? (
            <React.Fragment>
              <ContentBlock id="components.conditionDetails.issuanceDate" content={data.issuanceDate} half />
              <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} half />
              <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} half />
              <ContentBlock id="components.conditionDetails.status" content={<FormattedMessage id={`common.${data.status}`} />} half />
              <ContentBlock id="components.conditionDetails.sunsetDate" content={data.sunsetDate} half />
              <ContentBlock id="components.conditionDetails.location" content={data.location} half />
              <ContentBlock id="components.conditionDetails.type" content={data.type} />
              {this.renderContentText('components.conditionDetails.activity', data.activity)}
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} half />
              <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} half />
              <ContentBlock id="components.conditionDetails.keywords" content={data.conditions[this.props.itemIndex].keywords.join(', ')} />
              {this.renderContentText('components.conditionDetails.text', data.conditions[this.props.itemIndex].text)}
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

Content.propTypes = {
  instrument: PropTypes.shape({
    instrumentNumber: PropTypes.string.isRequired,
    issuanceDate: PropTypes.string.isRequired,
    effectiveDate: PropTypes.string.isRequired,
    sunsetDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  itemIndex: PropTypes.number.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
};

export default Content;

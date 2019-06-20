import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

import ContentBlock from '../ContentBlock';

class Content extends React.PureComponent {
  renderContentText = (id, content) => (
    <React.Fragment>
      <FormattedMessage id={id}>
        {(text) => {
          const fullText = `<span class="contentHeading">${text}:&nbsp;</span>${content}`;
          return (
            // eslint-disable-next-line react/no-danger
            <div className="contentText" dangerouslySetInnerHTML={{ __html: fullText }} />
          );
        }
          }
      </FormattedMessage>
    </React.Fragment>
  )

  renderInstrumentLink = instrumentNumber => (
    <button
      type="button"
      className="instrumentLink"
      {...handleInteraction(this.props.openIntermediatePopup, instrumentNumber)}
    >
      {instrumentNumber}
    </button>
  )

  getHighlightedKeywords = (matchList, givenString) => {
    let text = givenString;
    const oldString = text;
    let keywords = '';
    for (let j = 0; j < matchList.length; j += 1) {
      text = text.replace(new RegExp(matchList[j], 'g'), `<span class="highlighted">${matchList[j]}</span>`);
      if (oldString !== text) {
        keywords += `${matchList[j]}, `;
      }
    }
    keywords = keywords.substring(0, keywords.length - 2);
    return ({ text, keywords });
  }

  render() {
    const data = this.props.instrument;
    const formattedKeywords = this.getHighlightedKeywords(
      this.props.includedKeywords,
      (this.props.itemIndex === -1) ? '' : data.conditions[this.props.itemIndex].text,
    );
    return (
      <div className="Content">{
        (this.props.itemIndex === -1)
          ? (
            <React.Fragment>
              <div className="half">
                <ContentBlock id="components.conditionDetails.issuanceDate" content={data.issuanceDate} />
                <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} />
                <ContentBlock id="components.conditionDetails.sunsetDate" content={data.sunsetDate} />
              </div>
              <div className="half">
                <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} />
                <ContentBlock id="components.conditionDetails.status" content={<FormattedMessage id={`common.status.${data.status}`} />} />
                <ContentBlock id="components.conditionDetails.location" content={data.location} />
              </div>
              {this.renderContentText('components.conditionDetails.activity', data.activity)}
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <div className="half">
                <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} />
              </div>
              <div className="half">
                <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} />
              </div>
              <ContentBlock id="components.conditionDetails.keywords" content={formattedKeywords.keywords} />
              {this.renderContentText('components.conditionDetails.text', formattedKeywords.text)}
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
    location: PropTypes.array.isRequired,
    activity: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  itemIndex: PropTypes.number.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  includedKeywords: PropTypes.arrayOf(PropTypes.string),
};
Content.defaultProps = {
  includedKeywords: [],
};

export default Content;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';
import joinJsxArray from '../../../utilities/joinJsxArray';

import './styles.scss';

import ContentBlock from '../ContentBlock';

class Content extends React.PureComponent {
  renderContentText = (id, content) => (
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
  )

  renderDocumentLink = data => ((data.documentNumber)
    ? (
      <button
        type="button"
        className="instrumentLink"
        {...handleInteraction(this.props.openIntermediatePopup)}
      >
        {data.instrumentNumber}
      </button>
    )
    : <span>{data.instrumentNumber}</span>
  )

  getHighlightedKeywords = (matchList, givenString) => {
    if (matchList.length === 0) {
      return { highlightedText: givenString, matchedKeywords: [] };
    }
    const matched = [];
    const highlightedText = givenString.replace(
      new RegExp(`(${matchList.join('|')})`, 'gi'),
      (_, match) => {
        const keyword = match.toLowerCase();
        if (!matched.includes(keyword)) {
          matched.push(keyword);
        }
        return `<span class="highlighted">${match}</span>`;
      },
    );

    const matchedKeywords = joinJsxArray(
      matched.map(keyword => (
        <span className="highlighted" key={keyword}>{keyword}</span>
      )),
      ', ',
    );

    return { highlightedText, matchedKeywords };
  }

  render() {
    const data = this.props.instrument;
    const condition = this.props.itemIndex === -1 ? null : data.conditions[this.props.itemIndex];
    const { highlightedText, matchedKeywords } = this.getHighlightedKeywords(
      this.props.includedKeywords,
      condition ? condition.text : '',
    );

    return (
      <div className="Content">{
        (this.props.itemIndex === -1)
          ? (
            <React.Fragment>
              <div className="half">
                <ContentBlock
                  id="components.conditionDetails.issuanceDate"
                  content={data.issuanceDate}
                />
                <ContentBlock
                  id="components.conditionDetails.effectiveDate"
                  content={data.effectiveDate}
                />
                {!data.sunsetDate ? null : (
                  <ContentBlock
                    id="components.conditionDetails.sunsetDate"
                    content={data.sunsetDate}
                  />
                )}
              </div>
              <div className="half">
                <ContentBlock
                  id="components.conditionDetails.instrumentNumber"
                  content={this.renderDocumentLink(data)}
                />
                <ContentBlock
                  id="components.conditionDetails.status"
                  content={<FormattedMessage id={`common.status.${data.status}`} />}
                />
                <ContentBlock
                  id="components.conditionDetails.location"
                  content={<span>{data.location.join(', ')}</span>}
                />
              </div>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <div className="half">
                <ContentBlock
                  id="components.conditionDetails.effectiveDate"
                  content={data.effectiveDate}
                />
                {matchedKeywords.length === 0 ? null : (
                  <ContentBlock
                    id="components.conditionDetails.keywords"
                    content={matchedKeywords}
                  />
                )}
              </div>
              <div className="half">
                <ContentBlock
                  id="components.conditionDetails.instrumentNumber"
                  content={this.renderDocumentLink(data)}
                />
                <ContentBlock
                  id="components.conditionDetails.conditionNumber"
                  content={condition.conditionNumber}
                />
              </div>
              {this.renderContentText('components.conditionDetails.text', highlightedText)}
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
    documentNumber: PropTypes.string,
    issuanceDate: PropTypes.string.isRequired,
    effectiveDate: PropTypes.string.isRequired,
    sunsetDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    location: PropTypes.array.isRequired,
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

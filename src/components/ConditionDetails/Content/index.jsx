import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import handleInteraction from '../../../utilities/handleInteraction';
import joinJsxArray from '../../../utilities/joinJsxArray';

import './styles.scss';

import ContentBlock from '../ContentBlock';

// eslint-disable-next-line react/prop-types
const DangerousContentText = React.memo(({ children, content }) => (
  <div
    className="contentText"
    dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
      __html: `<span class="contentHeading">${children}:&nbsp;</span>${content}`,
    }}
  />
));

class Content extends React.PureComponent {
  static propTypes = {
    instrument: PropTypes.shape({
      instrumentNumber: PropTypes.string.isRequired,
      documentNumber: PropTypes.string,
      issuanceDate: PropTypes.string.isRequired,
      effectiveDate: PropTypes.string,
      sunsetDate: PropTypes.string,
      status: PropTypes.string.isRequired,
      location: PropTypes.array.isRequired,
      activity: PropTypes.string.isRequired,
      conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    itemIndex: PropTypes.number.isRequired,
    openIntermediatePopup: PropTypes.func.isRequired,
    includedKeywords: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    includedKeywords: [],
  };

  renderContentText = (id, content) => (
    <AdvancedFormattedMessage id={id} tag={DangerousContentText} content={content} />
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
                {!data.effectiveDate ? null : (
                  <ContentBlock
                    id="components.conditionDetails.effectiveDate"
                    content={data.effectiveDate}
                  />
                )}
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
                {!data.effectiveDate ? null : (
                  <ContentBlock
                    id="components.conditionDetails.effectiveDate"
                    content={data.effectiveDate}
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
              {matchedKeywords.length === 0 ? null : (
                <ContentBlock
                  id="components.conditionDetails.keywords"
                  content={matchedKeywords}
                />
              )}
              {this.renderContentText('components.conditionDetails.text', highlightedText)}
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

export default Content;

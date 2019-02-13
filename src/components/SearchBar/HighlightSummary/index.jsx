import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const keyWordsRender = keywords => (
  keywords.map((word, index) => (
    <React.Fragment key={word}>
      <span> {word} </span>
      {(index !== keywords.length - 1) ? (<span> , </span>) : (null) }
    </React.Fragment>
  ))
);

const HighlightSummary = props => (
  <div className="HighlightSummary">
    <FormattedMessage id="components.searchBar.highlightSummary.showingAll" />
    &nbsp;
    {props.selectedYear.start} - {props.selectedYear.end}
    &nbsp;
    <FormattedMessage id="components.searchBar.highlightSummary.highlightConditions">
      {text => (
        <span>
          {text.split('\n')
            .map(string => <span key={string}>{string}<br /></span>)}
        </span>
      )}
    </FormattedMessage>
    <div className="keywordsText">{keyWordsRender(props.keywords)}</div>
    <div />
  </div>
);

HighlightSummary.propTypes = {
  selectedYear: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HighlightSummary;

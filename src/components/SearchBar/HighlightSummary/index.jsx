import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { yearRangeType } from '../../../proptypes';

const HighlightSummary = props => (
  <div className="HighlightSummary">
    <FormattedMessage id="components.searchBar.highlightSummary.showingAll" />
    <span> {props.selectedYear.start} - {props.selectedYear.end } </span>
    {props.includeKeywords.length === 0 ? null : (
      <React.Fragment>
        <FormattedMessage id="components.searchBar.highlightSummary.includes">
          {text => (<p>{text} : </p>)}
        </FormattedMessage>
        <div className="keywordsText">
          {props.includeKeywords.join(', ')}
        </div>
      </React.Fragment>
    )}
    {props.excludeKeywords.length === 0 ? null : (
      <React.Fragment>
        <FormattedMessage id="components.searchBar.highlightSummary.excludes">
          {text => (<p>{text} : </p>)}
        </FormattedMessage>
        <div className="keywordsText">
          {props.excludeKeywords.join(', ')}
        </div>
      </React.Fragment>
    )}
  </div>
);

HighlightSummary.propTypes = {
  selectedYear: yearRangeType.isRequired,
  includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HighlightSummary;

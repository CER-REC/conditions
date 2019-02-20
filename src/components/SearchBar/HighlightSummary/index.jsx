import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const HighlightSummary = props => (
  <div className="HighlightSummary">
    <FormattedMessage id="components.searchBar.highlightSummary.showingAll" />
    <span> {props.selectedYear.start} - {props.selectedYear.end } </span>
    <FormattedMessage id="components.searchBar.highlightSummary.highlightConditions">
      {text => (<p>{text} : </p>)}
    </FormattedMessage>
    <div className="keywordsText">
      {props.keywords.join(', ')}
    </div>
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

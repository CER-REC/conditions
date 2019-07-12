import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { yearRangeType } from '../../../proptypes';

const joinJsxArray = (arr, joinWith) => {
  if (!arr || arr.length < 2) { return arr; }

  const out = [arr[0]];
  for (let i = 1; i < arr.length; i += 1) {
    out.push(joinWith, arr[i]);
  }
  return out;
};

const formatSummaryText = (arr, mapFunc) => joinJsxArray(arr.map(mapFunc), ', ');

const HighlightSummary = props => (
  <div className="HighlightSummary">
    <FormattedMessage
      id="components.searchBar.highlightSummary.showing"
      values={{
        status: <FormattedMessage
          id={
            `components.searchBar.filter.projectStatus.${
              (props.includedStatuses.length === 1)
                ? props.includedStatuses[0]
                : 'ALL'
            }`
          }
        />,
      }}
    />
    <span> {props.selectedYear.start} - {props.selectedYear.end } </span>
    <br />
    {props.includeKeywords.length === 0 ? null : (
      <React.Fragment>
        <FormattedMessage id="components.searchBar.highlightSummary.includes">
          {text => (<p>{text} : </p>)}
        </FormattedMessage>
        <div className="keywordsText">
          {formatSummaryText(
            props.includeKeywords,
            keyword => <span key={keyword}>{keyword}</span>,
          )}
        </div>
      </React.Fragment>
    )}
    {props.excludeKeywords.length === 0 ? null : (
      <React.Fragment>
        <FormattedMessage id="components.searchBar.highlightSummary.excludes">
          {text => (<p>{text} : </p>)}
        </FormattedMessage>
        <div className="keywordsText">
          {formatSummaryText(
            props.excludeKeywords,
            keyword => <span key={keyword}>{keyword}</span>,
          )}
        </div>
      </React.Fragment>
    )}
  </div>
);

HighlightSummary.propTypes = {
  selectedYear: yearRangeType.isRequired,
  includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  includedStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HighlightSummary;

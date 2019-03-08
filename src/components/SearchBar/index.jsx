import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tab from './Tab';
import SearchContent from './SearchContent';
import FilterContent from './FilterContent';
import SuggestedKeywordsPrompt from './SuggestedKeywordsPrompt';
import SuggestedKeywordsPopout from './SuggestedKeywordsPopout';
import HighlightSummary from './HighlightSummary';
import { yearRangeType, suggestedKeywordsObject } from '../../proptypes';

import './styles.scss';

class SearchBar extends React.PureComponent {
  static propTypes = {
    yearRange: yearRangeType.isRequired,
    availableYearRange: yearRangeType.isRequired,
    setExcluded: PropTypes.func.isRequired,
    setIncluded: PropTypes.func.isRequired,
    findAny: PropTypes.bool.isRequired,
    projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    suggestedKeywords: suggestedKeywordsObject.isRequired,
    availableCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    findAnyOnChange: PropTypes.func.isRequired,
    updateYear: PropTypes.func.isRequired,
    changeProjectStatus: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      isActive: false,
      isExclude: false,
    };
  }

  changeIsExclude = bool => (this.setState({ isExclude: bool }));

  render() {
    const {
      mode, isActive, isExclude,
    } = this.state;
    const {
      projectStatus, setIncluded, setExcluded,
      findAny, includeKeywords, excludeKeywords, suggestedKeywords,
      yearRange, availableYearRange, availableCategories, findAnyOnChange,
    } = this.props;
    const filterComponent = (mode !== 'filter') ? null : (
      <FilterContent
        projectStatus={projectStatus}
        selectedYear={yearRange}
        yearRange={availableYearRange}
        closeTab={() => (this.setState({ mode: '' }))}
        changeProjectStatus={this.props.changeProjectStatus}
        onYearSelect={this.props.updateYear}
      />
    );

    const suggestedPopout = (!isActive ? null
      : (
        <SuggestedKeywordsPopout
          suggestedKeywords={suggestedKeywords}
          closeTab={() => (this.setState({ isActive: false }))}
          setIncluded={setIncluded}
          setExcluded={setExcluded}
          categories={availableCategories}
          isExclude={isExclude}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
        />
      ));
    const searchComponent = (mode !== 'find') ? null : (
      <React.Fragment>
        <SearchContent
          setIncluded={setIncluded}
          setExcluded={setExcluded}
          closeTab={() => (this.setState({ mode: '' }))}
          findAnyOnChange={findAnyOnChange}
          findAny={findAny}
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          isExclude={isExclude}
          changeIsExclude={this.changeIsExclude}
        />
        <div className={classNames('SuggestionPrompt', { excludePrompt: (this.state.isExclude) })}>
          <SuggestedKeywordsPrompt
            onClick={
            () => (this.setState({ isActive: !isActive }))}
            isActive={isActive}
          />
        </div>
        {suggestedPopout}
      </React.Fragment>
    );

    const highlightedSummary = (mode !== '') ? null : (
      <HighlightSummary
        includeKeywords={includeKeywords}
        excludeKeywords={excludeKeywords}
        selectedYear={yearRange}
      />
    );
    return (
      <div className="SearchBar">
        <div className="SelectionTab">
          <Tab
            onClick={
              () => (this.setState(
                { mode: (mode !== 'find' || mode.length === 0) ? 'find' : '' },
              ))}
            isFilter={false}
            isActive={(mode === 'find')}
          />
          <div className={classNames('rect', 'horzDivider')} />
          <Tab
            onClick={() => (this.setState({ mode: (mode !== 'filter' || mode.length === 0) ? 'filter' : '' }))}
            isFilter
            isActive={(mode === 'filter')}
          />
          <div className={classNames('rect', 'horzLine')} />
        </div>
        {highlightedSummary}
        { searchComponent }
        { filterComponent }
      </div>
    );
  }
}

export default SearchBar;

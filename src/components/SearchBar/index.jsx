import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tab from './Tab';
import SearchContent from './SearchContent';
import FilterContent from './FilterContent';
import SuggestedKeywordsPrompt from './SuggestedKeywordsPrompt';
import SuggestedKeywordsPopout from './SuggestedKeywordsPopout';
import HighlightSummary from './HighlightSummary';

import './styles.scss';

class SearchBar extends React.PureComponent {
  static propTypes = {
    searchKeywords: PropTypes.instanceOf(Object).isRequired,
    yearRange: PropTypes.instanceOf(Object).isRequired,
    availableYearRange: PropTypes.instanceOf(Object).isRequired,
    updateSearchKeywords: PropTypes.func.isRequired,
    findAny: PropTypes.bool.isRequired,
    projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    suggestedKeywords: PropTypes.instanceOf(Object).isRequired,
    availableCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    addIncludeKeywords: PropTypes.func.isRequired,
    addExcludeKeywords: PropTypes.func.isRequired,
    includeOnChange: PropTypes.func.isRequired,
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
      projectStatus, updateSearchKeywords,
      findAny, searchKeywords, suggestedKeywords,
      yearRange, availableYearRange, availableCategories,
      addIncludeKeywords, addExcludeKeywords,
      includeOnChange,
    } = this.props;
    const filterComponent = (mode !== 'filter') ? null : (
      <FilterContent
        projectStatus={projectStatus}
        selectedYear={yearRange}
        yearRange={availableYearRange}
        closeTab={() => (this.setState({ mode: '' }))}
      />
    );

    const suggestedPopout = (!isActive ? null
      : (
        <SuggestedKeywordsPopout
          suggestedKeywords={suggestedKeywords}
          closeTab={() => (this.setState({ isActive: false }))}
          onClick={isExclude ? addExcludeKeywords : addIncludeKeywords} //
          categories={availableCategories}
          selectedWords={(isExclude ? searchKeywords.exclude : searchKeywords.include)}
        />
      ));
    const searchComponent = (mode !== 'find') ? null : (
      <React.Fragment>
        <SearchContent
          updateKeywords={updateSearchKeywords}
          closeTab={() => (this.setState({ mode: '' }))}
          includeOnChange={includeOnChange}
          findAny={findAny}
          searchKeywords={searchKeywords}
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
        keywords={searchKeywords.include}
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

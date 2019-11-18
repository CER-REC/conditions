import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash.memoize';

import Tab from './Tab';
import SearchContent from './SearchContent';
import FilterContent from './FilterContent';
import SuggestedKeywordsPrompt from './SuggestedKeywordsPrompt';
import SuggestedKeywordsPopout from './SuggestedKeywordsPopout';
import HighlightSummary from './HighlightSummary';

import { yearRangeType } from '../../proptypes';

import './styles.scss';

class SearchBar extends React.PureComponent {
  handleTabChange = memoize(toggleMode => () => this.setState(({ activeTab }) => ({
    activeTab: (activeTab !== toggleMode) ? toggleMode : '',
  })))

  static propTypes = {
    yearRange: yearRangeType.isRequired,
    availableYearRange: yearRangeType.isRequired,
    setExcluded: PropTypes.func.isRequired,
    setIncluded: PropTypes.func.isRequired,
    findAny: PropTypes.bool.isRequired,
    projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    suggestedKeywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
      conditionCount: PropTypes.number,
    })).isRequired,
    availableCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    findAnyOnChange: PropTypes.func.isRequired,
    updateYear: PropTypes.func.isRequired,
    changeProjectStatus: PropTypes.func.isRequired,
    scrollToMethodology: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['location', 'company']).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
      isActive: false,
      isExclude: false,
    };
  }

  componentDidUpdate(prev) {
    if (this.props.mode !== prev.mode) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ activeTab: '' });
    }
  }

  changeIsExclude = bool => (this.setState({ isExclude: bool }));

  toggleIsActive = () => this.setState(({ isActive }) => ({ isActive: !isActive }));

  filterIsActive = () => (
    this.props.yearRange.start !== this.props.availableYearRange.start
    || this.props.yearRange.end !== this.props.availableYearRange.end
    || this.props.projectStatus.length < 2
  )

  render() {
    const {
      activeTab: mode, isActive, isExclude,
    } = this.state;
    const {
      projectStatus, setIncluded, setExcluded,
      findAny, includeKeywords, excludeKeywords, suggestedKeywords,
      yearRange, availableYearRange, availableCategories, findAnyOnChange,
      changeProjectStatus, updateYear, scrollToMethodology,
    } = this.props;

    let modeComponent;
    switch (mode) {
      case 'find':
        modeComponent = (
          <>
            <SearchContent
              setIncluded={setIncluded}
              setExcluded={setExcluded}
              closeTab={this.handleTabChange('')}
              findAnyOnChange={findAnyOnChange}
              findAny={findAny}
              includeKeywords={includeKeywords}
              excludeKeywords={excludeKeywords}
              isExclude={isExclude}
              changeIsExclude={this.changeIsExclude}
            />
            <div className={classNames('SuggestionPrompt', { excludePrompt: (isExclude) })}>
              <SuggestedKeywordsPrompt
                onClick={this.toggleIsActive}
                isActive={isActive}
              />
            </div>
            {(!isActive) ? null
              : (
                <SuggestedKeywordsPopout
                  suggestedKeywords={suggestedKeywords}
                  closeTab={this.toggleIsActive}
                  setIncluded={setIncluded}
                  setExcluded={setExcluded}
                  categories={availableCategories}
                  isExclude={isExclude}
                  includeKeywords={includeKeywords}
                  excludeKeywords={excludeKeywords}
                  scrollToMethodology={scrollToMethodology}
                />
              )}
          </>
        );
        break;
      case 'filter':
        modeComponent = (
          <FilterContent
            projectStatus={projectStatus}
            selectedYear={yearRange}
            yearRange={availableYearRange}
            closeTab={this.handleTabChange('')}
            changeProjectStatus={changeProjectStatus}
            onYearSelect={updateYear}
          />
        );
        break;
      default:
        modeComponent = (
          <HighlightSummary
            showFilterSummary={this.props.mode === 'company' && this.filterIsActive()}
            includeKeywords={includeKeywords}
            excludeKeywords={excludeKeywords}
            selectedYear={yearRange}
            includedStatuses={projectStatus}
          />
        );
    }

    return (
      <div className={classNames('SearchBar', { small: this.props.mode === 'location' })}>
        <div className="SelectionTab">
          <Tab
            onClick={this.handleTabChange('find')}
            isActive={(mode === 'find')}
          />
          {
            (this.props.mode === 'location') ? null
              : (
                <Tab
                  onClick={this.handleTabChange('filter')}
                  isFilter
                  isActive={(mode === 'filter')}
                />
              )
          }
        </div>
        {modeComponent}
      </div>
    );
  }
}

export default SearchBar;

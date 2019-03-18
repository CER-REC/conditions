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
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
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

  handleTabChange = toggleMode => () => this.setState(({ mode }) => ({
    mode: (mode !== toggleMode) ? toggleMode : '',
  }))

  render() {
    const {
      mode, isActive, isExclude,
    } = this.state;
    const {
      projectStatus, setIncluded, setExcluded,
      findAny, includeKeywords, excludeKeywords, suggestedKeywords,
      yearRange, availableYearRange, availableCategories, findAnyOnChange,
      changeProjectStatus, updateYear,
    } = this.props;

    let modeComponent;
    switch (mode) {
      case 'find':
        modeComponent = (
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
            <div className={classNames('SuggestionPrompt', { excludePrompt: (isExclude) })}>
              <SuggestedKeywordsPrompt
                onClick={
                () => (this.setState({ isActive: !isActive }))}
                isActive={isActive}
              />
            </div>
            {(isActive)
              ? (
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
              )
              : null
            }
          </React.Fragment>
        );
        break;
      case 'filter':
        modeComponent = (
          <FilterContent
            projectStatus={projectStatus}
            selectedYear={yearRange}
            yearRange={availableYearRange}
            closeTab={() => (this.setState({ mode: '' }))}
            changeProjectStatus={changeProjectStatus}
            onYearSelect={updateYear}
          />
        );
        break;
      default:
        modeComponent = (
          <HighlightSummary
            includeKeywords={includeKeywords}
            excludeKeywords={excludeKeywords}
            selectedYear={yearRange}
          />
        );
    }

    return (
      <div className={classNames('SearchBar', this.props.className)}>
        <div className="SelectionTab">
          <Tab
            onClick={this.handleTabChange('find')}
            isActive={(mode === 'find')}
          />
          <Tab
            onClick={this.handleTabChange('filter')}
            isFilter
            isActive={(mode === 'filter')}
          />
        </div>
        {modeComponent}
      </div>
    );
  }
}

export default SearchBar;

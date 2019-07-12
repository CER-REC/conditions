import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';
import handleInteraction from '../../../utilities/handleInteraction';
import { suggestedKeywordsObject } from '../../../proptypes';
import KeywordList from './KeywordList';

class SuggestedKeywordsPopout extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    setIncluded: PropTypes.func.isRequired,
    setExcluded: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    suggestedKeywords: suggestedKeywordsObject.isRequired,
    isExclude: PropTypes.bool.isRequired,
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      sortBy: '',
      sortHierarchy: 'none',
    };
  }

  renderCategories = () => (
    this.props.categories.map((i) => {
      const { selectedCategory } = this.state;
      return (
        <li
          key={i}
          {...handleInteraction(this.categoryOnClick, i)}
          className={classNames('categoryList', 'upperCase', {
            selectedCategory: (selectedCategory.length === 0 && i === 'all')
              ? true : selectedCategory.includes(i),
          })
          }
        > { i }
        </li>
      );
    })
  )

  categoryOnClick = (li) => {
    const { selectedCategory } = this.state;
    if (li === 'all') return (this.setState({ selectedCategory: [] }));
    if (!selectedCategory.includes(li)) {
      return this.setState({ selectedCategory: selectedCategory.concat(li) });
    }
    return this.setState({ selectedCategory: selectedCategory.filter(v => v !== li) });
  }

  sortKeywords = () => {
    const { sortBy, sortHierarchy, selectedCategory } = this.state;
    const { suggestedKeywords } = this.props;
    let filteredKeywords = Object.entries(suggestedKeywords);
    if (selectedCategory.length > 0) {
      filteredKeywords = filteredKeywords
        .filter(([, { category }]) => category.some(v => (selectedCategory.includes(v))));
    }
    if (sortBy.length > 0 && sortHierarchy !== 'none') {
      const direction = (sortHierarchy === 'dec') ? -1 : 1;
      filteredKeywords = (sortBy === 'alphabetical')
        ? filteredKeywords.sort(([a], [b]) => a.localeCompare(b) * direction)
        : filteredKeywords.sort(([, a], [, b]) => (a.conditions - b.conditions) * direction);
    }
    return filteredKeywords;
  }

  sortHierarchyOnClick = () => {
    const sortArray = ['none', 'inc', 'dec'];
    this.setState(({ sortHierarchy }) => ({
      sortHierarchy: sortArray[(sortArray.indexOf(sortHierarchy) + 1) % 3],
    }));
  }

  changeSortOnClick = sort => (
    this.setState(({ sortBy }) => ({ sortBy: (sortBy === sort ? '' : sort) }))
  )

  render() {
    const keywords = this.sortKeywords();
    return (
      <div className="SuggestedKeywordsPopout">
        <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.suggestedKeywords">
          { text => <h1 className="keywordsTitle"> { text }  </h1> }
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.keywordsDescription">
          { text => <p className="description"> { text }  </p> }
        </FormattedMessage>
        <ul className="categories">
          <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.viewBy">
            { text => <li className="viewText"> { text }:  </li> }
          </FormattedMessage>
          {this.renderCategories()}
        </ul>
        <div className="rightText">
          <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.sortBy">
            {text => <span>{text} </span>}
          </FormattedMessage>
          <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.frequency">
            {text => (
              <span
                className={this.state.sortBy === 'frequency' ? 'selectedSort' : null}
                {...handleInteraction(this.changeSortOnClick, 'frequency')}
              > {text}
              </span>
            )}
          </FormattedMessage>
          &nbsp;|&nbsp;
          <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.alphabetical">
            {text => (
              <span
                className={this.state.sortBy === 'alphabetical' ? 'selectedSort' : null}
                {...handleInteraction(this.changeSortOnClick, 'alphabetical')}
              >{text}
              </span>
            )}
          </FormattedMessage>
          <span className="hierarchy" {...handleInteraction(this.sortHierarchyOnClick)}>
            <span className="arrow">
              <svg viewBox="0 0 427.5 427.5">
                <g>
                  <path d="M405.943,290.254L302.096,425.338c-1.04,
                  1.354-2.66,2.146-4.374,2.146c-1.702,0-3.321-0.798-4.368-2.146L189.511,290.254
                  c-0.769-0.993-1.144-2.176-1.144-3.357c0-1.152,0.364-2.329,
                  1.108-3.322c1.499-1.975,4.125-2.707,6.434-1.809l68.76,27.166V21.01
                  c0-3.047,2.477-5.503,5.515-5.503h55.106c3.038,0,5.509,
                  2.456,5.509,5.503v287.922l68.76-27.166
                  c2.305-0.898,4.93-0.166,6.419,1.809C407.473,285.561,
                  407.461,288.28,405.943,290.254z M238.012,143.913
                  c0.744-0.993,1.105-2.167,1.105-3.322c0-1.176-0.379-2.367-1.142-3.36L134.125,
                  2.148C133.081,0.792,131.458,0,129.759,0
                  c-1.714,0-3.328,0.798-4.377,2.148L21.539,137.23c-1.519,
                  1.969-1.525,4.69-0.03,6.683c1.487,1.968,4.114,2.707,6.419,1.803
                  l68.766-27.163v287.919c0,3.05,2.462,5.509,5.506,
                  5.509h55.109c3.041,0,5.515-2.459,5.515-5.509V118.552l68.763,27.163
                  C233.886,146.62,236.51,145.88,238.012,143.913z"
                  />
                </g>
              </svg>
            </span>
            <span className="upperCase sortType"> {this.state.sortHierarchy } </span>
          </span>
        </div>
        <KeywordList
          keywords={keywords}
          setIncluded={this.props.setIncluded}
          setExcluded={this.props.setExcluded}
          isExclude={this.props.isExclude}
          includeKeywords={this.props.includeKeywords}
          excludeKeywords={this.props.excludeKeywords}
        />
        <FormattedMessage id="components.searchBar.close">
          {text => (
            <div className="closeSearchKeywordPopout">
              <button
                {...handleInteraction(this.props.closeTab)}
                className="upperCase"
                type="button"
              > {text}
              </button>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default SuggestedKeywordsPopout;

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import memoize from 'lodash.memoize';
import './styles.scss';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import handleInteraction from '../../../utilities/handleInteraction';
import memoizeReference from '../../../utilities/memoizeReference';
import KeywordList from './KeywordList';

const sortKeywords = memoize((sortByCount, desc, selectedCategories, keywords) => {
  let filteredKeywords = keywords;
  if (selectedCategories.length > 0) {
    filteredKeywords = filteredKeywords
      .filter(({ category }) => category.some(v => selectedCategories.includes(v)));
  }
  const direction = desc ? -1 : 1;
  return [...filteredKeywords].sort(sortByCount
    ? (a, b) => (a.conditionCount - b.conditionCount) * direction
    : (a, b) => a.name.localeCompare(b.name) * direction);
}, (sortBy, desc, category, keywords) => `${sortBy}-${desc}-${category.join('|')}-${memoizeReference(keywords)}`);

// eslint-disable-next-line react/prop-types
const MethodologyLink = React.memo(({ children, scrollToMethodology }) => (
  <a {...handleInteraction(scrollToMethodology)}>
    {children}
  </a>
));

class SuggestedKeywordsPopout extends React.PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    setIncluded: PropTypes.func.isRequired,
    setExcluded: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    scrollToMethodology: PropTypes.func.isRequired,
    suggestedKeywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
      conditionCount: PropTypes.number,
    })).isRequired,
    isExclude: PropTypes.bool.isRequired,
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  keywordDescriptionValues = memoize(scrollToMethodology => ({
    here: (
      <AdvancedFormattedMessage
        id="components.searchBar.suggestedKeywordsPopout.keywordsHere"
        tag={MethodologyLink}
        scrollToMethodology={scrollToMethodology}
      />
    ),
  }));

  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      sortByCount: true,
      sortDesc: true,
    };
  }

  renderCategories = () => (
    this.props.categories.map((category) => {
      const { selectedCategory } = this.state;
      return (
        <li
          key={category}
          {...handleInteraction(this.categoryOnClick, category)}
          className={classNames(
            'categoryList',
            'upperCase',
            {
              selectedCategory: (selectedCategory.length === 0 && category === 'all')
                ? true : selectedCategory.includes(category),
            },
          )}
        >
          {
            (category !== 'all')
              ? category
              : this.props.intl.formatMessage({
                id: 'components.searchBar.suggestedKeywordsPopout.all',
              })
          }
        </li>
      );
    })
  )

  categoryOnClick = clicked => this.setState(({ selectedCategory }) => {
    if (clicked === 'all') { return { selectedCategory: [] }; }
    return {
      selectedCategory: selectedCategory.includes(clicked)
        ? selectedCategory.filter(v => v !== clicked)
        : selectedCategory.concat(clicked),
    };
  });

  toggleSortOrder = () => this.setState(({ sortDesc }) => ({ sortDesc: !sortDesc }));

  // Default sortDesc to count=descending and alphabetical=ascending
  toggleSortBy = sortByCount => this.setState(({ sortByCount, sortDesc: sortByCount }));

  render() {
    const keywords = sortKeywords(
      this.state.sortByCount,
      this.state.sortDesc,
      this.state.selectedCategory,
      this.props.suggestedKeywords,
    );
    return (
      <div className="SuggestedKeywordsPopout">
        <AdvancedFormattedMessage
          id="components.searchBar.suggestedKeywordsPopout.suggestedKeywords"
          tag="h1"
          className="keywordsTitle"
        />
        <AdvancedFormattedMessage
          id="components.searchBar.suggestedKeywordsPopout.keywordsDescription"
          tag="p"
          className="description"
          values={this.keywordDescriptionValues(this.props.scrollToMethodology)}
        />
        <ul className="categories">
          <AdvancedFormattedMessage
            id="components.searchBar.suggestedKeywordsPopout.viewBy"
            tag="li"
            className="viewText"
          />
          {this.renderCategories()}
        </ul>
        <div className="rightText">
          <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.sortBy" />
          &nbsp;
          <AdvancedFormattedMessage
            id="components.searchBar.suggestedKeywordsPopout.frequency"
            className={this.state.sortByCount ? 'selectedSort' : ''}
            {...handleInteraction(this.toggleSortBy, true)}
          />
          &nbsp;|&nbsp;
          <AdvancedFormattedMessage
            id="components.searchBar.suggestedKeywordsPopout.alphabetical"
            className={this.state.sortByCount ? '' : 'selectedSort'}
            {...handleInteraction(this.toggleSortBy, false)}
          />
          <span className="hierarchy" {...handleInteraction(this.toggleSortOrder)}>
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
            &nbsp;
            <AdvancedFormattedMessage
              id={`components.searchBar.suggestedKeywordsPopout.${
                // TODO: dec should be desc
                this.state.sortDesc ? 'dec' : 'inc'
              }`}
              className="upperCase sortType"
            />
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
        <div className="closeSearchKeywordPopout">
          <AdvancedFormattedMessage
            id="components.searchBar.close"
            tag="button"
            type="button"
            {...handleInteraction(this.props.closeTab)}
            className="upperCase"
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(SuggestedKeywordsPopout);

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import handleInteraction from '../../../utilities/handleInteraction';
import BarContainer from '../../BarContainer';

library.add(
  faMinusCircle,
  faPlusCircle,
);
class SuggestionWindow extends React.PureComponent {
  static propTypes = {
    selectedCategory: PropTypes.arrayOf(PropTypes.string),
    selectedWords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      conditions: PropTypes.number,
    })),
    suggestedKeywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      conditions: PropTypes.number,
    })).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickUpdate: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    changeSort: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortHierarchy: PropTypes.string.isRequired,
  }

  static defaultProps = {
    selectedCategory: [],
    selectedWords: ([{
      name: null,
      conditions: 0,
    }]),
  }

  renderCategories = () => (
    this.props.categories.map((i) => {
      const { selectedCategory } = this.props;
      const classArray = ['categoryList', 'upperCase'];
      const className = (selectedCategory.indexOf(i) > -1) ? 'selectedCategory' : '';
      classArray.push(className);
      return (
        <li
          key={i}
          {...handleInteraction(this.categoryOnClick, i)}
          className={classNames(classArray)}
        > { i }
        </li>
      );
    })
  )

  findMaxConditions = () => (
    this.props.suggestedKeywords.reduce((acc, item) => (
      (item.conditions < acc) ? acc : item.conditions
    ), 0))

  categoryOnClick = (li) => {
    const { selectedCategory } = this.props;
    const index = selectedCategory.indexOf(li);
    // eslint-disable-next-line no-unused-expressions
    (index === -1)
      ? (selectedCategory.push(li))
      : selectedCategory.splice(index, 1);
    return (this.props.onClickUpdate([selectedCategory, 'category']));
  }

  keywordOnClick = (obj) => {
    const { selectedWords } = this.props;
    const [value, present, index] = obj;
    // eslint-disable-next-line no-unused-expressions
    (!present)
      ? (selectedWords.push(value))
      : (selectedWords.splice(index, 1));
    return (this.props.onClickUpdate([selectedWords, 'words']));
  }

  sortHierarchy = () => {
    const sortHierarchyType = this.props.sortHierarchy;
    const sortArray = ['none', 'inc', 'dec'];
    const index = sortArray.indexOf(sortHierarchyType);
    const changeSortParam = (index !== sortArray.length - 1)
      ? ([sortArray[index + 1], 'hierarchy'])
      : ([sortArray[0], 'hierarchy']);
    this.props.changeSort(changeSortParam);
  }

  changeSort = sort => (this.props.sortBy === sort
    ? (this.props.changeSort(['', 'by']))
    : (this.props.changeSort([sort, 'by'])))

  renderKeyWords = () => this.props.suggestedKeywords.map((value) => {
    const { selectedWords } = this.props;
    const [present, selectedIndex] = selectedWords.reduce((acc, item, i) => (
      (acc[0] === true)
        ? acc
        : [item.name === value.name && item.conditions === value.conditions, i]
    ), [false, null]);

    const [icon, iconClass, selectedColor] = (present)
      ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)']
      : ['plus-circle', 'regularIcon', 'rgb(96,96,96)'];
    const maxConditions = this.findMaxConditions();
    const conditions = (value.conditions / maxConditions) * 200;
    const remainingSpace = (200 - conditions);
    return (
      <li key={`${value.name} ${value.conditions}`}>
        <span
          className="icon"
          {...handleInteraction(this.keywordOnClick, [value, present, selectedIndex])}
        >
          <Icon className={iconClass} icon={icon} />
        </span>
        <span className="keywordCategory">{value.name} </span>
        <span className="BarContainer">
          <BarContainer
            title="ConditionTitle"
            desc="conditionDesc"
            items={[{ value: conditions, fill: selectedColor },
              { value: remainingSpace, fill: 'transparent' }]}
            size={8}
            scale={1}
            vert={false}
          />
        </span>
        <div className="conditionsText">
          <FormattedMessage id="components.searchBar.suggestionWindow.conditions">
            {text => <div className="conditionsText"> {value.conditions} { text }  </div>}
          </FormattedMessage>
        </div>
      </li>
    );
  })

  render() {
    return (
      <div className="SuggestionWindow">
        <FormattedMessage id="components.searchBar.suggestionWindow.suggestedKeywords">
          { text => <h1 className="keywordsTitle"> { text }  </h1> }
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.suggestionWindow.keywordsDescription">
          { text => <p className="description"> { text }  </p> }
        </FormattedMessage>
        <ul className="categories">
          <FormattedMessage id="components.searchBar.suggestionWindow.viewBy">
            { text => <li className="viewText"> { text }:  </li> }
          </FormattedMessage>
          {this.renderCategories()}
        </ul>
        <div className="rightText">
          <FormattedMessage id="components.searchBar.suggestionWindow.sortBy">
            {text => <span>{text} </span>}
          </FormattedMessage>
          <FormattedMessage id="components.searchBar.suggestionWindow.frequency">
            {text => (
              <span
                className={this.props.sortBy === 'frequency' ? 'selectedSort' : null}
                {...handleInteraction(this.changeSort, 'frequency')}
              > {text}
              </span>
            )}
          </FormattedMessage>
          |
          <FormattedMessage id="components.searchBar.suggestionWindow.alphabetical">
            {text => (
              <span
                className={this.props.sortBy === 'alphabetical' ? 'selectedSort' : null}
                {...handleInteraction(this.changeSort, 'alphabetical')}
              >{text}
              </span>
            )}
          </FormattedMessage>
          <span className="hierarchy" {...handleInteraction(this.sortHierarchy)}>
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
            <span className="upperCase"> {this.props.sortHierarchy } </span>
          </span>
        </div>

        <div className="keywordsBox">
          <ul>
            { this.renderKeyWords() }
          </ul>
        </div>
        <FormattedMessage id="components.searchBar.close">
          {text => (
            <div {...handleInteraction(this.props.closeTab)} className="close">
              <button className="upperCase" type="button"> {text} </button>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default SuggestionWindow;

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import Icon from '../../Icon/index';
import Dropdown from '../../Dropdown';
import handleInteraction from '../../../utilities/handleInteraction';

library.add(
  faTimes,
  faPlusCircle,
);
class SearchContent extends React.PureComponent {
  static propTypes = {
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    setExcluded: PropTypes.func.isRequired,
    setIncluded: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    findAnyOnChange: PropTypes.func.isRequired,
    findAny: PropTypes.bool.isRequired,
    changeIsExclude: PropTypes.func.isRequired,
    isExclude: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputInclude: '',
      inputExclude: '',
      mode: (props.findAny === false || props.excludeKeywords.length > 0) ? 'advanced' : 'basic',
    };
  }

  searchWordsRender = (keywords, type) => (
    keywords.map(word => (
      <React.Fragment key={word}>
        <li className="liText"> {word} </li>
        <li className="deleteButton">
          <button type="button" {...handleInteraction(this.deleteWord, word, type)}>
            <Icon className="iconInline timesIcon" icon="times" />
          </button>
        </li>
      </React.Fragment>
    ))
  )

  keyWordsRender = keywords => (<span>{keywords.join(', ')} </span>)

  updateKeywords = (type, keywords) => {
    if (type === 'include') {
      this.props.setIncluded(keywords);
    } else {
      this.props.setExcluded(keywords);
    }
  }

  deleteWord = (word, type) => {
    const updatedKeywords = this.props[`${type}Keywords`].filter(v => v !== word);
    this.updateKeywords(type, updatedKeywords);
  }

  addWord = (word, type) => {
    if (!word || !word.trim()) { return; }
    const { includeKeywords, excludeKeywords } = this.props;
    if (includeKeywords.includes(word) || excludeKeywords.includes(word)) { return; }
    const currentKeywords = this.props[`${type}Keywords`];
    if (currentKeywords.length >= 6) { return; }
    this.updateKeywords(type, currentKeywords.concat(word));
  }

  updateInputInclude = e => this.setState({ inputInclude: e.target.value });

  updateInputExclude = e => this.setState({ inputExclude: e.target.value });

  addIncludeWord = () => {
    this.addWord(this.state.inputInclude, 'include');
    this.setState({ inputInclude: '' });
  }

  addIncludeWordOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // WET template will trigger a refresh on enter
      this.addIncludeWord();
    }
  }

  addExcludeWord = () => {
    this.addWord(this.state.inputExclude, 'exclude');
    this.setState({ inputExclude: '' });
  }

  addExcludeWordOnEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // WET template will trigger a refresh on enter
      this.addExcludeWord();
    }
  }

  excludeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage
          id="components.searchBar.findWords.searchText.exclude"
          values={{ // TODO: New objects cause wasted renders
            not: (
              <FormattedMessage id="components.searchBar.findWords.searchText.not" tagName="strong" />
            ),
          }}
        />
        :
      </div>
      <div className="input">
        <input
          value={this.state.inputExclude}
          onChange={this.updateInputExclude}
          onKeyDown={this.addExcludeWordOnEnter}
          onFocus={() => this.props.changeIsExclude(true)}
          className="searchBar"
        />
        <button
          type="button"
          className={classNames('addInput', { disabled: this.props.excludeKeywords.length === 6 })}
          {...handleInteraction(this.addExcludeWord)}
        >
          <Icon className={classNames(['iconInline', 'plusIcon'])} icon="plus-circle" />
        </button>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.excludeKeywords, 'exclude')}
      </ul>
    </React.Fragment>
  )

  highlightConditions = () => (
    <div className="highlightConditions">
      <AdvancedFormattedMessage
        id="components.searchBar.findWords.highlightText.highlightConditions"
        className="highlightText"
        tag="div"
      />

      <div className="anyText">
        <FormattedMessage
          id="components.searchBar.findWords.highlightText.followingInclude"
          values={{ // TODO: New objects cause wasted renders
            choice: (
              this.props.findAny
                ? (
                  <AdvancedFormattedMessage
                    id="components.searchBar.findWords.highlightText.any"
                    className="upperCase"
                  />
                )
                : (
                  <AdvancedFormattedMessage
                    id="components.searchBar.findWords.highlightText.all"
                    className="upperCase"
                  />
                )),
          }}
        />
        :
      </div>

      <div className="keywordsText">{this.keyWordsRender(this.props.includeKeywords)}</div>
      <div />
      {this.state.mode === 'basic' ? null
        : (
          <React.Fragment>

            <div className="anyText">
              <FormattedMessage
                id="components.searchBar.findWords.highlightText.followingExclude"
                values={{ // TODO: New objects cause wasted renders
                  choice: (
                    <AdvancedFormattedMessage
                      id="components.searchBar.findWords.highlightText.none"
                      className="upperCase"
                    />
                  ),
                }}
              />
              :
            </div>
            <div className="keywordsText">{this.keyWordsRender(this.props.excludeKeywords)}</div>
          </React.Fragment>
        )}
    </div>
  )

  includeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        {this.state.mode === 'basic'
          ? (
            <FormattedMessage id="components.searchBar.findWords.searchText.basicInclude" />
          )
          : (
            <FormattedMessage
              id="components.searchBar.findWords.searchText.advancedInclude"
              values={{ // TODO: New objects cause wasted renders
                dropdown: (<Dropdown
                  options={['any', 'all']}
                  onChange={v => this.props.findAnyOnChange(v === 'any')}
                  className="dropDown"
                  selectedOption={this.props.findAny ? 'any' : 'all'}
                  optionID="components.searchBar.findWords.options"
                />),
              }}
            />
          )
        }
        :
      </div>
      <div className="input">
        <input
          value={this.state.inputInclude}
          onChange={this.updateInputInclude}
          onKeyDown={this.addIncludeWordOnEnter}
          className="searchBar"
          onFocus={() => this.props.changeIsExclude(false)}
        />
        <button
          type="button"
          className={classNames(
            'addInput', { disabled: this.props.includeKeywords.length === 6 },
          )}
          {...handleInteraction(this.addIncludeWord)}
        >
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </button>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.includeKeywords, 'include')}
      </ul>
    </React.Fragment>
  )

  changeSearchType = () => {
    this.setState(prevState => ({ mode: (prevState.mode === 'basic' ? 'advanced' : 'basic') }));
    this.props.findAnyOnChange(true);
    this.props.changeIsExclude(false);
    this.updateKeywords('include', this.props.includeKeywords);
    this.updateKeywords('exclude', []);
  }

  reset = () => {
    this.updateKeywords('include', []);
    this.updateKeywords('exclude', []);
    this.props.findAnyOnChange(true);
    this.setState({ mode: 'basic' });
  }

  render() {
    return (
      <div className="SearchContent contentPane">
        <div
          {...handleInteraction(this.reset)}
          className={classNames('reset', { shifted: !this.props.isExclude })}
        >
          <AdvancedFormattedMessage
            id="components.searchBar.reset"
            className="upperCase"
          />
          <svg width={12} viewBox="0 0 427.5 427.5">
            <path
              d="M316.2,329.6c-60.9,57.6-157,54.8-214.6
              -6.1c-54.1-57.3-55.4-146.3-3-205.2c55.8-57.5,136.1-70.5,196.1
              -12.3l-55.2,56.8L427,197.5L386.8,11.2l-55.2,56.8c-76.2-71.2-195.8
              -67.2-267,9.1c-1.6,1.7-3.2,3.5-4.7,5.2c-74.9,79.8
              -71,205.2,8.9,280.2c77.9,73.1,199.7,71.3,275.5-4L316.2,329.6z"
            />
          </svg>
        </div>
        {this.includeSearchTextAndWords()}
        {(this.state.mode !== 'advanced') ? null : (this.excludeSearchTextAndWords())}
        <div className="advancedSearchText">
          <button type="button" {...handleInteraction(this.changeSearchType)}>
            {(this.state.mode === 'basic'
              ? <FormattedMessage id="components.searchBar.findWords.advancedSearch" />
              : <FormattedMessage id="components.searchBar.findWords.basicSearch" />)
            }
          </button>
        </div>
        {this.highlightConditions()}
        <div className="closeSearchBar">
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

export default SearchContent;

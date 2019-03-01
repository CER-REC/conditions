import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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

  addExcludeWord = () => {
    this.addWord(this.state.inputExclude, 'exclude');
    this.setState({ inputExclude: '' });
  }

  excludeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage
          id="components.searchBar.findWords.searchText.exclude"
          values={{
            not: (
              <FormattedMessage id="components.searchBar.findWords.searchText.not">
                {text => <span> <strong> {text} </strong> </span>}
              </FormattedMessage>
            ),
          }}
        />
      </div>
      <div className="input">
        <input value={this.state.inputExclude} onChange={this.updateInputExclude} onFocus={() => this.props.changeIsExclude(true)} className="searchBar" />
        <button type="button" className="addInput" {...handleInteraction(this.addExcludeWord)}>
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </button>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.excludeKeywords, 'exclude')}
      </ul>
    </React.Fragment>
  )

  highlightConditions = () => (
    <div className="highlightConditions">
      <FormattedMessage id="components.searchBar.findWords.highlightText.highlightConditions">
        {text => <div className="highlightText">{text}</div>}
      </FormattedMessage>

      <div className="anyText">
        <FormattedMessage
          id="components.searchBar.findWords.highlightText.following"
          values={{
            choice: (
              this.props.findAny
                ? (
                  <FormattedMessage id="components.searchBar.findWords.highlightText.any">
                    { text => <span className="upperCase"> {text} </span>}
                  </FormattedMessage>
                )
                : (
                  <FormattedMessage id="components.searchBar.findWords.highlightText.all">
                    { text => <span className="upperCase"> {text} </span>}
                  </FormattedMessage>
                )),
          }}
        />
      </div>

      <div className="keywordsText">{this.keyWordsRender(this.props.includeKeywords)}</div>
      <div />
      {this.state.mode === 'basic' ? null
        : (
          <React.Fragment>

            <div className="anyText">
              <FormattedMessage
                id="components.searchBar.findWords.highlightText.following"
                values={{
                  choice: (
                    <FormattedMessage id="components.searchBar.findWords.highlightText.none">
                      {text => <span className="upperCase"> {text} </span>}
                    </FormattedMessage>),
                }}
              />
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
              values={{
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
      </div>
      <div className="input">
        <input
          value={this.state.inputInclude}
          onChange={this.updateInputInclude}
          className="searchBar"
          onFocus={() => this.props.changeIsExclude(false)}
        />
        <button
          type="button"
          className="addInput"
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

  render() {
    return (
      <div className="SearchContent">
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
        <FormattedMessage id="components.searchBar.close">
          {text => (
            <div className="close">
              <button
                {...handleInteraction(this.props.closeTab)}
                type="button"
                className="upperCase"
              >
                {text}
              </button>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default SearchContent;

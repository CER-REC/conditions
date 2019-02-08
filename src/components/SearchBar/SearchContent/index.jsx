import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import handleInteraction from '../../../utilities/handleInteraction';

library.add(
  faTimes,
  faPlusCircle,
);
class SearchContent extends React.PureComponent {
  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateKeywords: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    exceptKeywords: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.string.isRequired,
    changeSearchType: PropTypes.func.isRequired,
  }

  static defaultProps = {
    exceptKeywords: [],
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.excludeInput = React.createRef();
  }

  searchWordsRender = (keywords, type) => (
    keywords.map(word => (
      <React.Fragment key={word}>
        <li className="liText"> {word} </li>
        <span {...handleInteraction(this.deleteWord, [word, type])}> <Icon className="iconInline timesIcon" icon="times" /> </span>
      </React.Fragment>
    ))
  )

  keyWordsRender = keywords => (
    keywords.map(word => (
      <React.Fragment key={word}>
        <span> {word}, </span>
      </React.Fragment>
    ))
  )

  deleteWord = (obj) => {
    const [word, type] = obj;
    const { keywords, exceptKeywords } = this.props;
    if (type === 'include') {
      const index = (keywords.indexOf(word) > -1) ? keywords.indexOf(word) : null;
      keywords.splice(index, 1);
      this.props.updateKeywords([keywords, 'include']);
    } else if (type === 'exclude') {
      const exceptIndex = (exceptKeywords.indexOf(word) > -1) ? exceptKeywords.indexOf(word) : null;
      exceptKeywords.splice(exceptIndex, 1);
      this.props.updateKeywords([exceptKeywords, 'exclude']);
    }
    return null;
  }

  addWord = (word, type) => {
    if (word.length === 0) { return null; }
    const { keywords, exceptKeywords } = this.props;
    if (type === 'include') {
      if (keywords.length < 6
        && keywords.indexOf(word) === -1
        && exceptKeywords.indexOf(word) === -1) {
        keywords.push(word);
        this.props.updateKeywords([keywords, 'include']);
      }
    } else if (type === 'exclude') {
      if (exceptKeywords.length < 6
        && exceptKeywords.indexOf(word) === -1
        && keywords.indexOf(word) === -1) {
        exceptKeywords.push(word);
        this.props.updateKeywords([exceptKeywords, 'exclude']);
      }
    }
    return null;
  }

  getIncludeWord = () => {
    if (this.input.current === null) { return this.addWord('test', 'include'); }
    const { value } = this.input.current;
    this.input.current.value = '';
    return this.addWord(value, 'include');
  }

  getExcludeWord = () => {
    if (this.input.current === null) { return this.addWord('test', 'exclude'); }
    const { value } = this.excludeInput.current;
    this.excludeInput.current.value = '';
    return this.addWord(value, 'exclude');
  }

  render() {
    return (
      <div className="SearchContent">
        <div className="includeText">
          <FormattedMessage id="components.SearchBar.findWords.searchText.include" />
        &nbsp;
          {/* TODO: Update with DropDown Option once public DropDownComponent is created */}
          {this.props.mode === 'basic'
            ? <FormattedMessage id="components.SearchBar.findWords.highlightText.any" />
            : (
              <FormattedMessage id="components.SearchBar.findWords.highlightText.any">
                {text => <span className="upperCase"> {text} </span>}
              </FormattedMessage>
            )
            }
        &nbsp;
          <FormattedMessage id="components.SearchBar.findWords.searchText.of" />:
        </div>
        <div className="input">
          <input ref={this.input} className="searchBar" />
          <span className="addInput" {...handleInteraction(this.getIncludeWord)}>
            <Icon className="iconInline plusIcon" icon="plus-circle" />
          </span>
        </div>
        <ul className="searchWords">
          {this.searchWordsRender(this.props.keywords, 'include')}
        </ul>
        { (this.props.mode !== 'advanced') ? null : (
          <React.Fragment>
            <div className="includeText">
              <FormattedMessage id="components.SearchBar.findWords.searchText.butDo" />
              &nbsp;
              <strong><FormattedMessage id="components.SearchBar.findWords.searchText.not" /></strong>
              &nbsp;
              <FormattedMessage id="components.SearchBar.findWords.searchText.include">
                {text => <span className=".lowerCase"> {text} </span>}
              </FormattedMessage>:
            </div>
            <div className="input">
              <input ref={this.excludeInput} className="searchBar" />
              <span className="addInput" {...handleInteraction(this.getExcludeWord)} >
                <Icon className="iconInline plusIcon" icon="plus-circle" />
              </span>
            </div>
            <ul className="searchWords">
              {this.searchWordsRender(this.props.exceptKeywords, 'exclude')}
            </ul>
          </React.Fragment>
        )}
        <div {...handleInteraction(this.props.changeSearchType)} className="advancedSearchText">
          {(this.props.mode === 'basic'
            ? <FormattedMessage id="components.SearchBar.findWords.advancedSearch" />
            : <FormattedMessage id="components.SearchBar.findWords.basicSearch" />)
          }
        </div>
        <div className="highlightConditions">
          <FormattedMessage id="components.SearchBar.findWords.highlightText.highlightConditions">
            {text => <div className="highlightText">{text}</div>}
          </FormattedMessage>
          <div className="anyText">
            <FormattedMessage id="components.SearchBar.findWords.highlightText.any">
              {text => <span className="upperCase"> {text} </span>}
            </FormattedMessage>
            <FormattedMessage id="components.SearchBar.findWords.highlightText.following" />
          </div>
          <div className="keywordsText">{this.keyWordsRender(this.props.keywords)}</div>
          <div />
          {this.props.mode === 'basic' ? null
            : (
              <React.Fragment>
                <div className="anyText">
                  <FormattedMessage id="components.SearchBar.findWords.highlightText.none">
                    {text => <span className="upperCase"> {text} </span>}
                  </FormattedMessage>
                  <FormattedMessage id="components.SearchBar.findWords.highlightText.following" />
                </div>
                <div className="keywordsText">{this.keyWordsRender(this.props.exceptKeywords)}</div>
              </React.Fragment>
            )}
        </div>

        <FormattedMessage id="components.SearchBar.close">
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

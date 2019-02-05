import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import CircleContainer from '../../CircleContainer';
import handleInteraction from '../../../utilities/handleInteraction';

library.add(
  faTimes,
  faPlusCircle,
);
class SearchContent extends React.PureComponent {
  static propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    display: PropTypes.bool.isRequired,
    deleteWord: PropTypes.func.isRequired,
    addWord: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    exceptKeywords: PropTypes.array,
    mode: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  searchWordsRender = keywords => (
    keywords.map(i => (
      <React.Fragment key={i}>
        <li className="liText"> {i} </li>
        <span {...handleInteraction(this.props.deleteWord, i)}> <Icon className="iconInline timesIcon" icon="times" /> </span>
      </React.Fragment>
    ))
  )

  keyWordsRender = keywords => (
    keywords.map(item => (
      <React.Fragment key={item}>
        <span> {item}, </span>
      </React.Fragment>
    ))
  )

  addWord = () => {
    const { value } = this.input.current;
    if (value.length === 0) { return null; }
    this.input.current.value = '';
    return this.props.addWord(value);
  }

  render() {
    if (!this.props.display) { return null; }
    return (
      <div className="SearchContent">
        <div className="includeText">
          <FormattedMessage id="components.SearchBar.findWords.searchText.include" />
        &nbsp;
          {/* TODO: Update with DropDown Option once DropDownComponent is created */}
          {this.props.mode === 'basic'
            ? <FormattedMessage id="components.SearchBar.findWords.highlightText.any" />
            : (
              <FormattedMessage id="components.SearchBar.findWords.highlightText.any">
                {text => text.toUpperCase()}
              </FormattedMessage>
            )
            }
        &nbsp;
          <FormattedMessage id="components.SearchBar.findWords.searchText.of" />:
        </div>
        <div className="input">
          <input ref={this.input} className="searchBar" />
          <CircleContainer onClick={this.addWord}>
            <Icon className="iconInline plusIcon" icon="plus-circle" />
          </CircleContainer>
        </div>
        <ul className="searchWords">
          {this.searchWordsRender(this.props.keywords)}
        </ul>
        <div className="includeText">
          <FormattedMessage id="components.SearchBar.findWords.searchText.butDo" />
        &nbsp;
          <strong><FormattedMessage id="components.SearchBar.findWords.searchText.not" /></strong>
        &nbsp;
          <FormattedMessage id="components.SearchBar.findWords.searchText.include">
            {text => text.toLowerCase()}
          </FormattedMessage>:
        </div>
        <div className="input">
          <input ref={this.excludeInput} className="searchBar" />
          <CircleContainer onClick={this.addExcludeWord}>
            <Icon className="iconInline plusIcon" icon="plus-circle" />
          </CircleContainer>
        </div>
        <ul className="searchWords">
          {this.searchWordsRender(this.props.exceptKeywords)}
        </ul>
        <FormattedMessage id="components.SearchBar.findWords.advancedSearch">
          {text => <div className="advancedSearchText">{text}</div>}
        </FormattedMessage>
        <div className="highlightConditions">
          <FormattedMessage id="components.SearchBar.findWords.highlightText.highlightConditions">
            {text => <div className="highlightText">{text}</div>}
          </FormattedMessage>
          <div className="anyText">
            <FormattedMessage id="components.SearchBar.findWords.highlightText.any">
              {text => text.toUpperCase()}
            </FormattedMessage>
            <FormattedMessage id="components.SearchBar.findWords.highlightText.following" />
          </div>
          <div className="keywordsText">{this.keyWordsRender(this.props.keywords)}</div>
          <div />
          <div className="anyText">
            <FormattedMessage id="components.SearchBar.findWords.highlightText.none">
              {text => text.toUpperCase()}
            </FormattedMessage>
            <FormattedMessage id="components.SearchBar.findWords.highlightText.following" />
          </div>
          <div className="keywordsText">{this.keyWordsRender(this.props.exceptKeywords)}</div>
        </div>
        <FormattedMessage id="components.SearchBar.close">
          {text => (
            <div className="close">
              <button
                {...handleInteraction(this.props.closeTab)}
                type="button"
              >
                {text.toUpperCase()}
              </button>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default SearchContent;

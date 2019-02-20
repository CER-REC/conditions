import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import FeaturesMenu from '../../FeaturesMenu';
import handleInteraction from '../../../utilities/handleInteraction';

library.add(
  faTimes,
  faPlusCircle,
);
class SearchContent extends React.PureComponent {
  static propTypes = {
    keywords: PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    updateKeywords: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    changeSearchType: PropTypes.func.isRequired,
    includeOnChange: PropTypes.func,
    selectedIncludeType: PropTypes.string,
  }

  static defaultProps = {
    keywords: PropTypes.shape({
      include: [],
      exclude: [],
    }),
    includeOnChange: () => {},
    selectedIncludeType: 'any',
  }

  constructor(props) {
    super(props);
    this.state = {
      inputInclude: '',
      inputExclude: '',
    };
  }

  searchWordsRender = (keywords, type) => (
    keywords.map(word => (
      <React.Fragment key={word}>
        <li className="liText"> {word} </li>
        <span {...handleInteraction(this.deleteWord, [word, type])}>
          <Icon className="iconInline timesIcon" icon="times" />
        </span>
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
    const { keywords } = this.props;
    const index = keywords[type].indexOf(word);
    keywords[type].splice(index, 1);
    return this.props.updateKeywords(keywords);
  }

  addWord = (word, type) => {
    if (word.length === 0) { return null; }
    const type2 = (type === 'include') ? 'exclude' : 'include';
    const { keywords } = this.props;
    if (keywords[type].length < 6
      && keywords[type].indexOf(word) === -1
      && keywords[type2].indexOf(word) === -1) {
      keywords[type].push(word);
      this.props.updateKeywords(keywords);
    }
    return null;
  }

  updateInputInclude = e => this.setState({ inputInclude: e.target.value });

  updateInputExclude = e => this.setState({ inputExclude: e.target.value });

  getIncludeWord = () => {
    this.addWord(this.state.inputInclude, 'include');
    return this.setState({ inputInclude: '' });
  }

  getExcludeWord = () => {
    this.addWord(this.state.inputExclude, 'exclude');
    return this.setState({ inputExclude: '' });
  }

  excludeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage id="components.searchBar.findWords.searchText.butDo" />
        <FormattedMessage id="components.searchBar.findWords.searchText.not">
          {text => <span className="spacedText"><strong> {text} </strong></span> }
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.findWords.searchText.include">
          {text => <span className="lowerCase"> {text} </span>}
        </FormattedMessage>:
      </div>
      <div className="input">
        <input value={this.state.inputExclude} onChange={this.updateInputExclude} className="searchBar" />
        <span className="addInput" {...handleInteraction(this.getExcludeWord)}>
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </span>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.keywords.exclude, 'exclude')}
      </ul>
    </React.Fragment>
  )

  highlightConditions = () => (
    <div className="highlightConditions">
      <FormattedMessage id="components.searchBar.findWords.highlightText.highlightConditions">
        {text => <div className="highlightText">{text}</div>}
      </FormattedMessage>
      <div className="anyText">
        <FormattedMessage id="components.searchBar.findWords.highlightText.any">
          {text => <span className="upperCase"> {text} </span>}
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.findWords.highlightText.following" />
      </div>
      <div className="keywordsText">{this.keyWordsRender(this.props.keywords.include)}</div>
      <div />
      {this.props.mode === 'basic' ? null
        : (
          <React.Fragment>
            <div className="anyText">
              <FormattedMessage id="components.searchBar.findWords.highlightText.none">
                {text => <span className="upperCase"> {text} </span>}
              </FormattedMessage>
              <FormattedMessage id="components.searchBar.findWords.highlightText.following" />
            </div>
            <div className="keywordsText">{this.keyWordsRender(this.props.keywords.exclude)}</div>
          </React.Fragment>
        )}
    </div>
  )

  includeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage id="components.searchBar.findWords.searchText.include" />
        {this.props.mode === 'basic'
          ? (
            <FormattedMessage id="components.searchBar.findWords.highlightText.any">
              {text => <span className="spacedText"> {text} </span>}
            </FormattedMessage>
          )
          : (
            <FeaturesMenu
              features={['any', 'all']}
              onChange={this.props.includeOnChange}
              dropDown
              dropDownID="components.searchBar.findWords.options"
              selected={this.props.selectedIncludeType}
            />
          )
      }
        <FormattedMessage id="components.searchBar.findWords.searchText.of" />:
      </div>
      <div className="input">
        <input value={this.state.inputInclude} onChange={this.updateInputInclude} className="searchBar" />
        <span className="addInput" {...handleInteraction(this.getIncludeWord)}>
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </span>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.keywords.include, 'include')}
      </ul>
    </React.Fragment>
  )

  render() {
    return (
      <div className="SearchContent">
        {this.includeSearchTextAndWords()}
        {(this.props.mode !== 'advanced') ? null : (this.excludeSearchTextAndWords())}
        <div {...handleInteraction(this.props.changeSearchType)} className="advancedSearchText">
          {(this.props.mode === 'basic'
            ? <FormattedMessage id="components.searchBar.findWords.advancedSearch" />
            : <FormattedMessage id="components.searchBar.findWords.basicSearch" />)
          }
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

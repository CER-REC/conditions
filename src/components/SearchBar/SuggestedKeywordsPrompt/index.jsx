import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import handleInteraction from '../../../utilities/handleInteraction';

// eslint-disable-next-line react/prop-types
const TranslatedParagraphs = ({ children }) => children
  .split('\n')
  .map(line => <p key={line} className="colorChange">{line}</p>);

const SuggestedKeywordsPrompt = props => (
  <div className={classNames('SuggestedKeywordsPrompt', { isActive: props.isActive })}>
    <AdvancedFormattedMessage
      id="components.searchBar.suggestedKeywordsPrompt.selectFrom"
      className="selectFrom"
      tag="p"
    />
    <AdvancedFormattedMessage
      id="components.searchBar.suggestedKeywordsPrompt.suggestedKeywords"
      tag={TranslatedParagraphs}
    />
    <svg
      className="arrow"
      {...handleInteraction(props.onClick)}
      viewBox="0 0 15 15"
      width={15}
      height={15}
    >
      <circle cx="7.5" cy="7.5" r="7.1" />
      <polyline points="6,4.5 9.5,7.5 6,10.5" />
    </svg>
  </div>
);

SuggestedKeywordsPrompt.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SuggestedKeywordsPrompt;

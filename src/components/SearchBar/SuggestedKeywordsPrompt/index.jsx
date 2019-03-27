import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import handleInteraction from '../../../utilities/handleInteraction';

const SuggestedKeywordsPrompt = props => (
  <div className={classNames('SuggestedKeywordsPrompt', { isActive: props.isActive })}>
    <FormattedMessage id="components.searchBar.suggestedKeywordsPrompt.selectFrom">
      {text => (<p className="selectFrom">{text}</p>)}
    </FormattedMessage>
    <FormattedMessage id="components.searchBar.suggestedKeywordsPrompt.suggestedKeywords">
      {text => (
        text.split('\n')
          .map(string => <p className="colorChange" key={string}>{string}</p>)
      )}
    </FormattedMessage>
    <svg
      className="arrow"
      {...handleInteraction(props.onClick)}
      viewBox="0 0 15 15"
      width={15}
      height={15}
    >
      <circle cx="50%" cy="50%" r="50%" />
      <polyline points="6,4.5 9.5,7.5 6,10.5" />
    </svg>
  </div>
);

SuggestedKeywordsPrompt.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SuggestedKeywordsPrompt;

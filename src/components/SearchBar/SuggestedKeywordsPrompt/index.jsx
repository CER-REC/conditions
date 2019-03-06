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
      viewBox="0 0 427.5 427.5"
      width={20}
      height={20}
    >
      <circle cx="215" cy="213.8" r="213.8" />
      <polygon
        points="175.6,125.5 158,144.3 251.1,230.8 158,317.3 175.6,336.1 288.9,230.8 "
      />
    </svg>
  </div>
);

SuggestedKeywordsPrompt.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default SuggestedKeywordsPrompt;

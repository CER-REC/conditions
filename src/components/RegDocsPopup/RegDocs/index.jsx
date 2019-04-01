import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';

import './styles.scss';

const localeStr = id => `components.modal.regdocs.${id}`;

const checkIcon = (
  <svg className="checkIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <polyline points="33 45, 45 55, 70 31, 76 37, 45 72, 25 53" />
  </svg>
);

const plusPath = `
  M 46 28
  a 4 4 0 0 1 8,0
  v 18
  h 18
  a 4 4 0 0 1 0,8
  h -18
  v 18
  a 4 4 0 0 1 -8,0
  v -18
  h -18
  a 4 4 0 0 1 0,-8
  h 18
  v -18
  Z
`;

const plusIcon = (
  <svg className="buttonIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <path fill="white" d={plusPath} />
  </svg>
);

const xIcon = (
  <svg className="buttonIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <path fill="white" d={plusPath} transform="rotate(45 50 50)" />
  </svg>
);

const RegDocs = ({ instrument, regdocsUrl, closeModal }) => (
  <div className="RegDocs">
    <FormattedMessage
      id={localeStr('searchFor')}
      values={{
        instrument: (<strong>#{instrument}</strong>),
        regdocs: (<FormattedMessage id={localeStr('regdocs')} tagName="strong" />),
      }}
    >
      {(...strings) => <h3>{strings}</h3>}
    </FormattedMessage>
    <p className="iconContainer">
      {checkIcon}
      <FormattedMessage id={localeStr('found')} />
    </p>
    <FormattedMessage id={localeStr('currentTab')}>
      {text => (
        <a className="button" href={regdocsUrl}>
          {<div>{text}</div>}
          {plusIcon}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id={localeStr('newTab')}>
      {text => (
        <a className="button" href={regdocsUrl} target="_blank" rel="noopener noreferrer">
          {<div>{text}</div>}
          {plusIcon}
        </a>
      )}
    </FormattedMessage>
    <FormattedMessage id={localeStr('cancel')}>
      {text => (
        <button type="button" {...handleInteraction(closeModal)}>
          {text}
          {xIcon}
        </button>
      )}
    </FormattedMessage>

    <FormattedMessage id={localeStr('whatIsHeading')} tagName="h4" />
    <FormattedMessage id={localeStr('whatIsText')} tagName="p" />
  </div>
);

RegDocs.propTypes = {
  instrument: PropTypes.string.isRequired,
  regdocsUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RegDocs;

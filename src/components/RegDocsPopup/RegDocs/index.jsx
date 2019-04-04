import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import PopupBtn from '../../PopupBtn';

import './styles.scss';

const checkIcon = (
  <svg className="checkIcon" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
    <polyline points="33 45, 45 55, 70 31, 76 37, 45 72, 25 53" />
  </svg>
);

const RegDocs = ({ instrument, regdocsUrl, closeModal }) => (
  <div className="RegDocs">
    <FormattedMessage
      id="components.modal.regdocs.searchFor"
      values={{
        instrument: (<strong key="instrument">#{instrument}</strong>),
        regdocs: (<FormattedMessage id="components.modal.regdocs.regdocs" tagName="strong" key="regdocs" />),
      }}
    >
      {(...strings) => <h3>{strings}</h3>}
    </FormattedMessage>
    <p className="iconContainer">
      {checkIcon}
      <FormattedMessage id="components.modal.regdocs.found" />
    </p>
    <FormattedMessage id="components.modal.regdocs.currentTab">
      {text => (<PopupBtn text={text} icon="plus" action={regdocsUrl} />)}
    </FormattedMessage>
    <FormattedMessage id="components.modal.regdocs.newTab">
      {text => (
        <PopupBtn
          text={text}
          icon="plus"
          action={regdocsUrl}
          attributes={{
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        />
      )}
    </FormattedMessage>
    <FormattedMessage id="components.modal.regdocs.cancel">
      {text => (<PopupBtn text={text} icon="x" action={closeModal} className="cancel" />)}
    </FormattedMessage>
    <FormattedMessage id="components.modal.regdocs.whatIsHeading" tagName="h4" />
    <FormattedMessage id="components.modal.regdocs.whatIsText" tagName="p" />
  </div>
);

RegDocs.propTypes = {
  instrument: PropTypes.string.isRequired,
  regdocsUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default RegDocs;

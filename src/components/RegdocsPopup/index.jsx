import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../utilities/handleInteraction';

import Modal from '../Modal';

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

const RegdocsComponent = ({ instrument, regdocsUrl, closeModal }) => (
  <React.Fragment>
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
        <button type="button" onClick={closeModal}>
          {text}
          {xIcon}
        </button>
      )}
    </FormattedMessage>

    <FormattedMessage id={localeStr('whatIsHeading')} tagName="h4" />
    <FormattedMessage id={localeStr('whatIsText')} tagName="p" />
  </React.Fragment>
);

RegdocsComponent.propTypes = {
  instrument: PropTypes.string.isRequired,
  regdocsUrl: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const RegdocsPopup = ({ instrument, regdocsUrl, isOpen, closeModal }) => {

  return (
    <Modal
      component={RegdocsComponent}
      componentProps={{
        instrument,
        regdocsUrl,
      }}
      isOpen={isOpen}
      closeModal={closeModal}
      className="RegdocsPopup"
    />
  );
};

RegdocsPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function to be run when the modal is closed */
  closeModal: PropTypes.func.isRequired,
  /** Instrument number ('XO-001-2018') */
  instrument: PropTypes.string.isRequired,
  /** Regdocs page for the instrument */
  regdocsUrl: PropTypes.string.isRequired,
};

RegdocsPopup.defaultProps = {
  isOpen: false,
};

export default RegdocsPopup;

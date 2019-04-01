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

const RegdocsPopup = (props) => {
  const component = ({ closeModal }) => (
    <React.Fragment>
      <FormattedMessage
        id={localeStr('searchFor')}
        values={{
          instrument: (<strong>#{props.instrument}</strong>),
          regdocs: (<FormattedMessage id={localeStr('regdocs')} tagName="strong" />),
        }}
      >
        {(...strings) => <p>{strings}</p>}
      </FormattedMessage>
      <p className="iconContainer">
        {checkIcon}
        <FormattedMessage id={localeStr('found')} />
      </p>
      <button type="button">
        Current
        {plusIcon}
      </button>
      <button type="button">
        New
        {plusIcon}
      </button>
      <button type="button" onClick={closeModal}>
        Cancel
        {xIcon}
      </button>
      <FormattedMessage id={localeStr('whatIsHeading')} tagName="h4" />
      <FormattedMessage id={localeStr('whatIsText')} tagName="p" />
    </React.Fragment>
  );

  return (
    <Modal
      component={component}
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      className="RegdocsPopup"
    />
  );
};

RegdocsPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
  /** Adds a link to the footer of the Modal window that triggers this function */
  modalAction: PropTypes.func,
  instrument: PropTypes.string.isRequired,
};

RegdocsPopup.defaultProps = {
  modalAction: null,
  isOpen: false,
};

export default RegdocsPopup;

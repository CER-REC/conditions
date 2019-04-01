import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../utilities/handleInteraction';

import Modal from '../Modal';

import './styles.scss';

const localeStr = id => `components.modal.regdocs.${id}`;

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
        {(a, b, c, d) => <p>{a}{b}{c}{d}</p>}
      </FormattedMessage>
      <p>
        <span>[icon]</span>
        <FormattedMessage id={localeStr('found')} />
      </p>
      <button type="button">Current</button>
      <button type="button">New</button>
      <button type="button" onClick={closeModal}>Cancel</button>
      <p>
        <FormattedMessage id={localeStr('whatIsHeading')} tagName="h4" />
        <FormattedMessage id={localeStr('whatIsText')} />
      </p>
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

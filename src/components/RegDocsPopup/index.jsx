import React from 'react';
import PropTypes from 'prop-types';

import RegDocs from './RegDocs';
import Modal from '../Modal';

import { regDocsUrl } from '../../constants';

import './styles.scss';

const RegDocsPopup = ({ instrument, isOpen, closeModal }) => (
  <Modal
    component={RegDocs}
    componentProps={{
      instrument,
      regDocsUrl,
    }}
    isOpen={isOpen}
    closeModal={closeModal}
    className="RegDocsPopup"
  />
);

RegDocsPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function to be run when the modal is closed */
  closeModal: PropTypes.func.isRequired,
  /** Instrument number ('XO-001-2018') */
  instrument: PropTypes.string.isRequired,
};

RegDocsPopup.defaultProps = {
  isOpen: false,
};

export default RegDocsPopup;

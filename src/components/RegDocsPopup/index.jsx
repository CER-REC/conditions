import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import RegDocs from './RegDocs';
import Modal from '../Modal';

const getComponentProps = memoize(document => ({ document }));
const RegDocsPopup = ({ document, isOpen, closeModal }) => (
  <Modal
    component={RegDocs}
    componentProps={getComponentProps(document)}
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
  /** Document number ('XO-001-2018') */
  document: PropTypes.string.isRequired,
};

RegDocsPopup.defaultProps = {
  isOpen: false,
};

export default React.memo(RegDocsPopup);

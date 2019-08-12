import React from 'react';
import PropTypes from 'prop-types';

import TotalConditions from './TotalConditions';
import Modal from '../Modal';

import './styles.scss';

const TotalConditionsPopup = ({ isOpen, closeModal }) => (
  <Modal
    component={TotalConditions}
    isOpen={isOpen}
    closeModal={closeModal}
    className="TotalConditionsPopup"
  />
);

TotalConditionsPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function to be run when the modal is closed */
  closeModal: PropTypes.func.isRequired,

};

TotalConditionsPopup.defaultProps = {
  isOpen: false,
};

export default TotalConditionsPopup;

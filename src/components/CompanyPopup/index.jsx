import React from 'react';
import PropTypes from 'prop-types';

import Company from './Company';
import Modal from '../Modal';

import './styles.scss';

const CompanyPopup = ({ projectName, companies, isOpen, closeModal }) => (
  <Modal
    component={Company}
    componentProps={{
      projectName,
      companies,
    }}
    isOpen={isOpen}
    closeModal={closeModal}
    className="CompanyPopup"
  />
);

CompanyPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function to be run when the modal is closed */
  closeModal: PropTypes.func.isRequired,
  /** Full project name */
  projectName: PropTypes.string.isRequired,
  /** List of associated companies */
  companies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CompanyPopup.defaultProps = {
  isOpen: false,
};

export default React.memo(CompanyPopup);

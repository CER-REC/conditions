import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

const RegDocs = (props) => {
  const {
    isOpen,
    closeModal,
  } = props;

  if (!isOpen) { return null; }

  return (
    <div className="RegDocs">
      Hello!
    </div>
  );
};

RegDocs.propTypes = {
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
};

RegDocs.defaultProps = {
  isOpen: false,
};

export default RegDocs;

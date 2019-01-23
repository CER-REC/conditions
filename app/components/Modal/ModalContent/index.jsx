import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

const ModalContent = (props) => {
  const {
    type,
    content,
    modalAction,
    isOpen,
    closeModal,
  } = props;

  if (!isOpen) { return null; }

  return (
    <div className="ModalContent">
      <div className="header">
        <span className="title">
          <FormattedMessage id={`components.modal.${type}.title`} />
        </span>
        {/* Didn't use Icon because icon was not supported in our font-awesome library */}
        <svg
          version="1.1"
          width="20"
          height="20"
          className="closeIcon"
          {...handleInteraction(closeModal)}
        >
          <line x1="0" y1="20" x2="20" y2="0" strokeLinecap="round" />
          <line x1="0" y1="0" x2="20" y2="20" strokeLinecap="round" />
        </svg>
      </div>
      <div className="content">
        {content}
      </div>
      <div className="footer">
        {!modalAction ? null : (
          <button
            className="textButton"
            type="button"
            {...handleInteraction(modalAction)}
          >
            <FormattedMessage id={`components.modal.${type}.actionText`} />
          </button>
        )}
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  /** The type of modal (used to look up text for language) */
  type: PropTypes.string.isRequired,
  /** The element to be rendered in the center of the modal */
  content: PropTypes.node.isRequired,
  /** Height of modal window (percent or pixel) */
  height: PropTypes.string,
  /** Width of modal window (percent or pixel)  */
  width: PropTypes.string,
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
  /** Adds a link to the footer of the Modal window that triggers this function */
  modalAction: PropTypes.func,
};

ModalContent.defaultProps = {
  modalAction: null,
  isOpen: false,
  height: '100%',
  width: '100%',
};

export default ModalContent;

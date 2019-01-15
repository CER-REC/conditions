import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../../utilities/handleInteraction';
import './styles.scss';

const ModalContent = (props) => {
  const {
    title,
    content,
    modalAction,
    isOpen,
    closeModal,
  } = props;

  if (!isOpen) { return null; }

  return (
    <div className="ModalContent">
      <div className="header">
        <span className="title">{title}</span>
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
            {...handleInteraction(modalAction.task)}
          >
            {modalAction.text}
          </button>
        )}
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  /** The title of the Modal window */
  title: PropTypes.string.isRequired,
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
  /** Adds a link to the footer of the Modal window */
  modalAction: PropTypes.shape({
    /** The copy for the Modals footer link */
    text: PropTypes.string.isRequired,
    /** The function to handle after interacted with */
    task: PropTypes.func.isRequired,
  }),
};

ModalContent.defaultProps = {
  modalAction: null,
  isOpen: false,
  height: '100%',
  width: '100%',
};

export default ModalContent;
